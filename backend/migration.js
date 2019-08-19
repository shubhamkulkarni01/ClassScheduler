const AWS = require('aws-sdk');

const config = require('./config.js');
const key = config.key;
const secret = config.secret;

AWS.config.update({
  "region": "us-east-2",
  "endpoint": "https://dynamodb.us-east-2.amazonaws.com",
  "accessKeyId": key,
  "secretAccessKey": secret
  });

const docClient = new AWS.DynamoDB.DocumentClient();

const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
        
var mSpec = {
  connectionString: 'mongodb+srv://shubhamkulkarni01:aweSomeness...needEd@classscheduler-cgqo7.gcp.mongodb.net/test?retryWrites=true&w=majority',
  dbName: 'mydb',
  tableName: 'classes'
};

var dSpec = {
  tableName: 'classes',
  modify(item) { 
    item._id = item.name+" "+item.term; 
  }
};

dynamoToMongo(dSpec, mSpec);

function dynamoToMongo(dynamoSpec, mongoSpec){
  docClient.scan({TableName: dynamoSpec.tableName}, (err, result) => {
    result.Items.forEach(item => dynamoSpec.modify(item));
    MongoClient.connect(mongoSpec.connectionString, {}, (err, database) =>
      database.db(mongoSpec.dbName).collection(mongoSpec.tableName)
          .insertMany(result.Items, (e2, r) => 
            e2 === null ? console.log(r.insertedCount) : console.log(e2)
          )
    );
  });
}
