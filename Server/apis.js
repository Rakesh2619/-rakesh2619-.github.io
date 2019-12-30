const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs");
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


const readJsonFileSync = (filepath, encoding) => {
    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    // console.log('pastdue', file[0]);
    return file;
}


const pastdue = readJsonFileSync('./responses/accordianlistjson.json');
const urgent = readJsonFileSync('./responses/urgent.json');
const grid = readJsonFileSync('./responses/griddata.json');
const gridJson =  JSON.parse(grid);
let responseArr = [];

let flag = true;
app.post('/apis/inititems',  function (req, res) {
    switch (req.body.item) {
        case "pastdue": 
            res.send(pastdue);
            flag = false;
            break;
        case "rowdataurgent1":
            res.send(gridJson.rowdataurgent1);
            break;
        case "gridpastdue1": 
            res.send(gridJson.rowdatapastdue1);
            break;
        case "gridpastdue2": 
            res.send(gridJson.rowdatapastdue2);
            break;
        case "gridpastdue3": 
            res.send(gridJson.rowdatapastdue3);
            break;
        default:
        res.send([]);
    }

  })
 
app.listen(4000)