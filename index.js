const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const axios = require("axios");
const parser = require("node-html-parser");
const qs = require("qs");

const resources = require('./res.js');

// all query params are stored in res.js
const url = resources.url;
const header = resources.header;
var postRequest = resources.postRequest;
postRequest.courses = "CSE 140";

console.log("creating axios request");
axios.post(url, qs.stringify(postRequest), header)
      .then(response => extractDataFromHtml(response.data))
      .catch(err => console.log(err));

//debug statement to track server init
console.log("here");

//set express view engine
app.use(express.static("public"));
app.set("view engine", "ejs");

// helper function to extract data from html string and compress in object form.
function extractDataFromHtml(string){
  //parse html string
  var html = parser.parse(string);
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
  console.log();
  console.log();

  var course = { name: "CSE 100", term: "Fall 2019", classes: []};

  selected.forEach(row => {
      //lecture row
      if(row.childNodes[7].toString().indexOf("Lecture") != -1){
        var section = { section: row.childNodes[9].childNodes[0].rawText, 
                        instructor: row.childNodes[19].childNodes[1].rawText,
                        first: [], second: [], totalFirst: [], totalSecond: []};
        if(section.instructor == '')
          section.instructor = 'Staff';
        course.classes.push(section);
      }
      //discussion row
      else if(row.childNodes[7].toString().indexOf("Discussion") != -1){
        course.classes.forEach(c => {
          if(c.section[0] == row.childNodes[9].childNodes[0].rawText[0]){
            var remaining = row.childNodes[21].childNodes[0].rawText;

            //class is full
            if(remaining.indexOf("(") != -1)
              remaining = "-" + remaining.substring(remaining.indexOf("(")+1, 
                                                    remaining.indexOf(")"));

            //add total and remaining seats
            c.first.push(remaining);
            c.totalFirst.push(row.childNodes[23].childNodes[0].rawText);
          }
        });
      }
  });
  console.log(course);
  course.classes.forEach(c => {console.log(c.first); console.log(c.totalFirst);});
}

//works
//console.log(selected[0].childNodes[7].childNodes[0].attributes["title"]);

//unnecesary code
router.get("/:p/data/:id", function(req, res) {
  let myData = null;
  let apiUrl =
    "https://us-central1-vision-migration.cloudfunctions.net/la_hacks_2019?market_code=";

  apiUrl += req.params.p;
  axios.get(apiUrl).then(response => {
    myData = response.data;
    var array = [];
    response.data.buckets[0].report.rollups[
      req.params.id
    ].top_articles_on_network.forEach(item => {
      if (
        array.findIndex(
          obj => Object.values(obj).toString() == Object.values(item).toString()
        ) == -1
      )
        array.push(item);
    });
    var loc = response.data.views[req.params.p];
    promises = [];
    sa_promises = [];
    e_promises = [];
    se_promises = [];

    console.log("creating url array");
    response.data.buckets[0].report.rollups[
      req.params.id
    ].top_articles_on_network.forEach(item => {
      const url = Object.keys(item);
      promises.push(axios.get(url[0]));
    });

    console.log("creating analysis arrays");
    axios.all(promises).then(results => {
      results.forEach(response => {
        const client = new language.LanguageServiceClient();
        const text = cheerio("p", response.data).text();
        const document = {
          content: text,
          type: "PLAIN_TEXT"
        };
        sa_promises.push(client.analyzeSentiment({ document: document }));
        e_promises.push(client.analyzeEntities({ document }));
        se_promises.push(client.analyzeEntitySentiment({ document: document }));
      });
      var resObject = {data:array, loc:LOCATION[req.params.p], l:req.params.p,
          name: response.data.buckets[0].report.rollups[req.params.id].name};
      resObject.name=resObject.name.charAt(0).toUpperCase() + 
                     resObject.name.slice(1);
      doAllTheWork(sa_promises, e_promises, se_promises, res, resObject);
    }).catch((error)=>console.log(error));

  })
  .catch((error)=>console.log(error));
});

function doAllTheWork(sa_promises, e_promises, se_promises, res, resObject){
    getStuff(sa_promises,res,resObject).then((data)=>{
      getMoreStuff(e_promises,res,resObject, data).then((moreData)=>{
        getEvenMoreStuff(se_promises,res,resObject, moreData).then((evenMoreData)=>{
          var object = makeStuffCoherent(evenMoreData);
          var complete = {name:evenMoreData.name, data:evenMoreData.data, 
                          loc:evenMoreData.loc, l:evenMoreData.l, 
                          avg:evenMoreData.avg, entities:object, 
                          emotion:evenMoreData.emotion};
          res.render("detail", complete);
        });
      })
    }); 
}

function getStuff(sa_promises, res, resObject) {
  console.log("about to execute sa analysis");
  return Promise.all(sa_promises)
    .then(allResults => {
      var total = 0,
        counter = 0;
      console.log("executing analysis array of size: " + allResults.length);
      allResults.forEach(resultArr => {
        const sentiment = resultArr[0].documentSentiment;
        total += sentiment.score;
        counter++;
        console.log(`Sentiment score: ${sentiment.score}`);
        console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
      });
      var sentiment = (total/counter).toFixed(3);
      var myEmotion = sentiment > 0.1 ? "positive" 
                      : sentiment < -0.1 ? "negative" : "neutral";
      console.log("average: " + total / counter);
      var data = Object.assign(resObject, {"avg":sentiment, 
              emotion:myEmotion});
      return data;
    })
    .catch(err => {
      console.error("ERROR:", err);
    });
}

function getMoreStuff(e_promises, res, resObject, data) {
  console.log("about to execute entity analysis");
  var array = [];
  return Promise.all(e_promises)
    .then(allResults => {
      console.log("performing entity analysis for " + allResults.length);
      allResults.forEach(resultArr => {
        const entities = resultArr[0].entities;
        var website = [];
        var l = entities.length > 10? 10: entities.length;
        for (var i = 0; i < l; i++) {
          var entity = entities[i];
          var myEntity = {
            name: entity.name,
            type: entity.type,
            salience: entity.salience.toFixed(2)
          };
          website.push(myEntity);
        }
        array.push(website);
        console.log("finished a website!");
      });
      var moreData = Object.assign(data, {"entity":array});
      return moreData;
    })
    .catch(err => {
      console.error("ERROR:", err);
    });
}

function getEvenMoreStuff(se_promises, res, resObject, moreData) {
  console.log("about to execute sentiment entity analysis");
  var array = [];
  return Promise.all(se_promises)
    .then(allResults => {
      console.log("sentiment entity analysis for " + allResults.length);
      allResults.forEach(resultArr => {
        const entities = resultArr[0].entities;
        var website = [];
        var l = entities.length > 10? 10: entities.length;
        for (var i = 0; i < l; i++) {
          var entity = entities[i];
          var myEntity = {
            name: entity.name,
            type: entity.type,
            score: entity.sentiment.score.toFixed(2),
            magnitude: entity.sentiment.magnitude.toFixed(2)
          };
          website.push(myEntity);
        }
        array.push(website);
        console.log("finished website");
      });
      var evenMoreData = Object.assign(moreData, {"entitySentiment":array});
      return evenMoreData;
    })
    .catch(err => {
      console.error("ERROR:", err);
      res.render("detail_noinfo", moreData);
    });
}

function makeStuffCoherent(data) {
  var entity = data.entity;
  var entitysentiment = data.entitySentiment;
  if (entity.length != entitysentiment.length)
    console.log("oopsies! your arrays are not of the same size.");
  var object = [];
  for (var i = 0; i < entity.length; i++) {
    if (entity[i].length != entitysentiment[i].length)
      console.log("oopsies! your arrays are not of the same size.");
    var website = [];
    for (var j = 0; j < entity[i].length; j++){
      var temp = Object.assign(entity[i][j], entitysentiment[i][j]);
      website.push(temp);
    }
    object.push(website);
  }
  return object;
}

router.get("/:id?", function(req, res) {

  let myData = null;
  var locate = 0;
  let apiUrl =
    "https://us-central1-vision-migration.cloudfunctions.net/la_hacks_2019?market_code=";
  if (req.params.id != null) {
    apiUrl += req.params.id;
    locate = req.params.id;
  } else apiUrl += 0;
  axios
    .get(apiUrl)
    .then(response => {
      myData = response.data;
      console.log(response.data);
      response.data.buckets[0].report.rollups.forEach(item => {
        console.log(item.name);
      });
      res.render("index", {
        data: response.data.buckets[0].report.rollups,
        loc: LOCATION[locate],
        l: locate
      });
      console.log(myData);
    })
    .catch(error => {
      console.log(error);
    });

  if (myData != null) console.log(myData);
});

//add the router
app.use("/", router);
//app.listen(process.env.port || 3000);

console.log("Running at Port 3000");

