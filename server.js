const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//give access to public files such as css and html files
app.use(express.static('public'));

//get index.html file
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './public/index'));
});

app.post('/api/todolist', function (req, res) {
    console.log(req.body);
    //end response
    res.end();
});

app.delete('/', function(req,res){
    // toDoList[toDoList.findIndex(e => e.)]//not sure how this is handled
    // res.end();
});

app.listen(PORT, function () {
    console.log(`App listening on PORT ${PORT}`);
});

