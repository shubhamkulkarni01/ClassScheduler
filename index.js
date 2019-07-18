const express = require("express");
const app = express();
const path = require("path");

const axios = require("axios");
const parser = require("node-html-parser");
const qs = require("qs");

const AWS = require('aws-sdk');

const resources = require('./res.js');

//console.log(resources.classList);

const config = require('./config.js');

// all query params are stored in res.js
const url = resources.url;
const header = resources.header;

const key = config.key;
const secret = config.secret;

AWS.config.update({
  "region": "us-east-2",
  "endpoint": "https://dynamodb.us-east-2.amazonaws.com",
  "accessKeyId": key,
  "secretAccessKey": secret
  });

const docClient = new AWS.DynamoDB.DocumentClient();
const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var mydb = null;

var cache = {};
var currTerm = "Fall 2019"; 

//debug statement to track server init
console.log("server init complete");

//set express view engine
app.use(express.static("public"));
app.set("view engine", "ejs");

//add the router
app.listen( process.env.PORT || 3000 );

console.log("Running at Port 3000");

app.get('/', (req, res) => { res.send('hewwo world'); });

/* used to deal with get requests to the API specifying class name */
app.get('/api/class/:className', function(req, res) {
          
    res.timeOfArrival = new Date().getTime();

    console.log("GET request arrived: /api/class");
    console.log("course name: " + req.params.className);

    var postRequest = resources.postRequest;
    //deal with non-letter class (CSE 140/140L problem)
    postRequest.courses = req.params.className;
    if(/^[^A-z]$/i.test(postRequest.courses[postRequest.courses.length-1]))
      postRequest.courses += "-A";

    findFromDb(req.params.className, res);
    console.log("returning database object");
    console.log(new Date().getTime() - res.timeOfArrival);

    console.log("executing axios request for UCSD schedule of classes");
    axios.post(url, qs.stringify(postRequest), header)
    .then(response => { 
        console.log("axios request succeeded");
        console.log(new Date().getTime() - res.timeOfArrival);
        var currCourse = extractDataFromHtml(req.params.className, 
                                             response.data, res); 
        console.log("processed data");
        console.log(new Date().getTime() - res.timeOfArrival);
        // add the current course info to database
        addToDb(currCourse, res);
        console.log("added to db");
        console.log(new Date().getTime() - res.timeOfArrival);
        
        //cache the current course info for quick access for the /api/cache
        //since we do not deliver the whole item to the user.
        cache[currCourse.name] = currCourse;
        /* console.log("cached course data");
        console.log(cache); */
    } )
    .catch(err => { console.log("axios request failed"); console.log(err) });

});

app.get('/api/cache/:className', function(req, res){
    console.log("GET request arrived: /api/class");
    console.log("course name: " + req.params.className);
    console.log(cache);
    if(req.params.className in cache)
      res.json(cache[req.params.className]);    
    else
      res.status(404).send('cache not found, try again later');
});

function findFromDb(courseName, res){
  var params = { 
    TableName: "classes", 
    Key: {
      "name": courseName, 
      "term": currTerm 
    }
  };

  docClient.get(params, (err, result) => res.json(result));
}

function addToDb(currCourse, res){
    var params = { 
      TableName: "classes", 
       Key: {
         "name": currCourse.name, 
         "term": currTerm 
       }
    };

    var object = {
      TableName: 'classes',
      Item: {}
    }

    docClient.get(params, (err, result) => {
      if(err) throw err;

      if(result.Item !== undefined){ 
        var dbCourse = result.Item;
        for(var i = 0; i < currCourse.classes.length; i++){
        //discussions loop, get each section
          for(var j = 0; j < currCourse.classes[i].discussions.length; j++){
            //check for 5 minute time difference
            if(dbCourse.classes[i].discussions[j].enrollments[
                  dbCourse.classes[i].discussions[j].enrollments.length-1]
                  .time + 300000 < currCourse.classes[i].discussions[j]
                  .enrollments[currCourse.classes[i].discussions[j]
                  .enrollments.length-1].time || 
                  //check for different seat count
                  dbCourse.classes[i].discussions[j].enrollments[
                  dbCourse.classes[i].discussions[j].enrollments.length-1]
                  .remaining != currCourse.classes[i].discussions[j]
                  .enrollments[currCourse.classes[i].discussions[j]
                  .enrollments.length-1].remaining)
              dbCourse.classes[i].discussions[j].enrollments.push(
                  currCourse.classes[i].discussions[j].enrollments[
                  currCourse.classes[i].discussions[j].enrollments.length-1]);
          }
        }
        object['Item'] = dbCourse;
        
      }
      else
        object.Item = currCourse;

      docClient.put(object, (err, data) => { 
        if(err) throw err; 
        else console.log('success');
      });
    });
}

// helper function to extract data from html string and compress in object form
function extractDataFromHtml(courseName, htmlString, res){
  //parse html string
  var html = parser.parse(htmlString);
  var selected = html.querySelectorAll(".sectxt");

  /*
  selected.forEach(item => { console.log(item.childNodes[7].toString()); 
        console.log(item.childNodes[7].toString().indexOf("Lecture"));
        console.log();
  });
  console.log(selected[0].childNodes.forEach(item => console.log(item)));
  //finding whether discussion or lecture 
  console.log(selected[0].childNodes[7].toString().indexOf("Lecture"));
  console.log(); 
  console.log(selected.length);

  //instructor name
  console.log(selected[2].childNodes[19].childNodes[1].rawText);
  console.log();

  //number of seats remaining
  console.log(selected[4].childNodes[21].childNodes[0].rawText);
  console.log();

  //total seats
  console.log(selected[1].childNodes[23].childNodes[0].rawText);
  console.log();

  //FULL + waitlist count
  console.log(selected[3].childNodes[21].childNodes[0].rawText.trim());
  console.log();

  //total seats
  console.log(selected[3].childNodes[23].childNodes[0].rawText);
  console.log();
   */

  //something that i cannot quite figure out
  //console.log(selected[1].childNodes[25].toString());
  //console.log();
  //console.log();

  var course = { name: courseName, term: "Fall 2019", classes: []};

  selected.forEach(row => {
      //lecture row
      if(row.childNodes[7].toString().indexOf("Lecture") != -1){
        var lecture = { lecture: row.childNodes[9].childNodes[0].rawText.trim(), 
                        instructor: row.childNodes[19].childNodes[1].rawText,
                        discussions: [] }; 
        if(lecture.instructor == '')
          lecture.instructor = 'Staff';
        else
          lecture.instructor = lecture.instructor.trim();
        course.classes.push(lecture);
      } 
      //discussion row
      else if(row.childNodes[21].childNodes[0].rawText.trim() !== "&nbsp;"){
      //else if(row.childNodes[7].toString().indexOf("Discussion") != -1){
        //get the remaining seats 
        var rem = row.childNodes[21].childNodes[0].rawText;

        //class is full
        if(rem.indexOf("(") != -1)
        rem = "-" + rem.substring(rem.indexOf("(")+1, rem.indexOf(")"));

        var t = new Date().getTime();

        //create enrollment object
        var enrollment = { time: t, 
                           remaining: rem, 
                           total: row.childNodes[23].childNodes[0].rawText };
        
        var lectureIndex = course.classes.findIndex((c) => 
                c.lecture[0] == row.childNodes[9].childNodes[0].rawText[0]);
        var lecture = course.classes[lectureIndex];

        //find relevant section using findIndex
        var index = lecture.discussions.findIndex((element) => 
            element.section === row.childNodes[9].childNodes[0].rawText.trim());

        //if index == -1, then create new section
        if(index == -1)
          var section = { section: row.childNodes[9].childNodes[0].rawText
                                      .trim(),
                          enrollments: [] };
        else
          var section = course.classes[index];

        //add new enrollment
        section.enrollments.push(enrollment);

        //add new discussion to list
        if(index == -1)
          lecture.discussions.push(section);

      }
  });
  return course;
}

function getClassData(){
  
}
