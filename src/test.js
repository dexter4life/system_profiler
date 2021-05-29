const csvtojsonV2 = require("csvtojson/v2");
const path = require("path");
const fs = require("fs");

const csv = require("csvtojson");
const { EOL } = require("os");

let common = "C:/VSCodeProject/vue-electron-app/dist_electron/";
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
      
    });
});

// const csvFilePath=training_path;
// const csv=require('csvtojson')
// csv()
// .fromFile(csvFilePath)
// .then((jsonObj)=>{
//     console.log(jsonObj);
//     /**
//      * [
//      * 	{a:"1", b:"2", c:"3"},
//      * 	{a:"4", b:"5". c:"6"}
//      * ]
//      */
// })
