<<<<<<< HEAD
// const csvtojsonV2 = require("csvtojson/v2");
// const path = require("path");
// const fs = require("fs");

// const csv = require("csvtojson");
// const { EOL } = require("os");

// let common = "C:/Users/Peter/Documents/VSCodeProject/vue-electron-app/dist_electron/";
// let training_path = path.join(
//     common,
//   "/",
//   "train.csv"
// );

// fs.open(path.join(common,"/","train__.csv"), "w", function(err, file) {
//   if (err) throw err;
//   const csvFilePath = training_path;

//   csv()
//     .fromFile(csvFilePath)
//     .then((jsonObj) => {
//       console.log(jsonObj);
//       jsonObj.forEach(entry => {
//         fs.appendFileSync(file, entry.insult === '1' ? "\"insult\"" : "\"none\"");
//         fs.appendFileSync(file, ',');  
//         fs.appendFileSync(file, `\"${String(entry.comment)}\"`);
//         fs.appendFileSync(file, EOL);

//       });
=======
/**
   Unit Test for convert CSV file to JSON file 
*/

const path = require("path");
const fs = require("fs");
const csv = require("csvtojson");
const { EOL } = require("os");

let common = "C:/VSCodeProject/dist_electron/";
let training_path = path.join(
    common,
  "/",
  "train.csv"
);

fs.open(path.join(common,"/","train.csv"), "w", function(err, file) {
  if (err) throw err;
  const csvFilePath = training_path;

  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      console.log(jsonObj);
      jsonObj.forEach(entry => {
        fs.appendFileSync(file, entry.insult === '1' ? "\"insult\"" : "\"none\"");
        fs.appendFileSync(file, ',');  
        fs.appendFileSync(file, `\"${String(entry.comment)}\"`);
        fs.appendFileSync(file, EOL);

      });
>>>>>>> 6bfa17495812b0aafb331e93bab320970cae4e82
      
//     });
// });

// // const csvFilePath=training_path;
// // const csv=require('csvtojson')
// // csv()
// // .fromFile(csvFilePath)
// // .then((jsonObj)=>{
// //     console.log(jsonObj);
// //     /**
// //      * [
// //      * 	{a:"1", b:"2", c:"3"},
// //      * 	{a:"4", b:"5". c:"6"}
// //      * ]
// //      */
// // })


const autobahn = require("autobahn");

var connection = new autobahn.Connection({
  url: `ws://18.191.252.189:9090/`,
  realm: "realm1",
});

connection.onopen = function(session) {
  console.log('the connection is open now');

  console.log(session);
  
  session.publish("com.global.report", [{ active: true, id: require('crypto').randomBytes(10).toString('hex') }]);
};
connection.onclose = function() {
  console.log('this connection is close now');
  session.publish("com.global.report", [{ active: false, id: require('crypto').randomBytes(10).toString('hex') }]);
};

connection.open();

