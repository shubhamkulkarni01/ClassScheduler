const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");
const parser = require("node-html-parser");
const qs = require("qs");

const resources = require('./res.js');

// all query params are stored in res.js
const url = resources.url;
const header = resources.header;

//debug statement to track server init
console.log("here");

//set express view engine
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get('/api/class/:className', function(req, res) {
          
    console.log("request arrived");
    console.log(req.params.className);

    var postRequest = resources.postRequest;
    //deal with non-letter class (CSE 140/140L problem)
    if(/^[^A-z]$/i.test(req.params.className[req.params.className.length-1]))
      req.params.className += "-A";
    postRequest.courses = req.params.className;

    console.log("creating axios request");
    axios.post(url, qs.stringify(postRequest), header)
    .then(response => { 
        console.log("axios request succeeded");
        var currCourse = extractDataFromHtml(req.params.classname, response.data); 
        //var dbCourse will originate from db, use another helper function.
        var courseObject = { currentStatus: currCourse };
        res.json(courseObject);
        } )
    .catch(err => { console.log("axios request failedd"); console.log(err) });

}
);

//add the router
app.listen(process.env.port || 3000);

console.log("Running at Port 3000");

// helper function to extract data from html string and compress in object form.
function extractDataFromHtml(courseName, htmlString){
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
      else if(row.childNodes[7].toString().indexOf("Discussion") != -1){
        //get the remaining seats 
        var rem = row.childNodes[21].childNodes[0].rawText;

        //class is full
        if(rem.indexOf("(") != -1)
        rem = "-" + rem.substring(rem.indexOf("(")+1, rem.indexOf(")"));

        //create enrollment object
        var enrollment = { time: "insert time", 
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
