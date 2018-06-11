var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var lokijs = require("lokijs");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.listen(3009, () => console.log('Server started at port 3009'));

var db = new lokijs('list.js', {autoload: true});

db.addCollection('list');

app.get('/list', (request, response) => {
    db.loadDatabase({}, () => {
        let list = db.getCollection('list');
        response.json(list.data);
    });
});

app.post('/list', (request, response) => {
    db.loadDatabase({}, () => {
        let novaSerie = request.body;

        let list = db.getCollection('list');
        list.insert(novaSerie);

        db.saveDatabase();
        response.status(200).end();
    });
});

app.delete('/list/:titulo', (request, response) => {
    db.loadDatabase({}, () => {
        let list = db.getCollection('list');
        list.findAndRemove({titulo: request.params.titulo});

        db.saveDatabase();
        response.status(200).end();
    })
});

app.put('/list', (request, response) => {
    db.loadDatabase({}, () => {
        let serieAtualizada = request.body;

        let list = db.getCollection('list');
        let serieAlvo = list.findOne({$loki: serieAtualizada.$loki});
        serieAlvo = serieAtualizada;

        list.update(serieAlvo);

        db.saveDatabase();
        response.status(200).end();
    })
});

