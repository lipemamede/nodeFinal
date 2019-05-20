const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const uuid = require('uuid');
const jwt = require('jsonwebtoken');
const taskDAO = require('./taskDAO');
const KEY = 'passeinamateriaclaro';
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

function cobrarTokenJWT(req, resp, next) {
    if (req.url == '/login' || req.url == '/') {
        next();
    }
    var token = req.headers['x-access-token'];
    try {
        jwt.verify(token, KEY);
        next();
    } catch (e) {
        resp.status(500).send({ message: 'token inválido'});
    }
}
app.use(cobrarTokenJWT);

app.get('/', (req, res) => res.send({message: 'ok'}));

app.post('/tasks', (request, response) => {
    const body = request.body;
    const task = {
    title: body.title,
    description: body.description,
    isDone: body.isDone,
    isPriority: body.isPriority
};

    taskDAO.insert(task, (err, data) => {
        if (err) {
            response.status(500).send(err);
        } else {
            response.send(data);
        }
    });
});


app.get('/tasks', (request, response) => {
    taskDAO.listAll((err, data) => {
        if (err) {
            response.status(500).send(err);
        } else {
            response.send(data);
        }
    });
});

app.get('/tasks/:taskId', (request, response) => {
    taskDAO.findTaskById(request.params.taskId, (err, task) => {
        if (task) {
            response.status(200);
            response.send(task);
        } else if (err) {
            response.status(500);
            response.send(err);
        } else {
            response.status(404);
            response.send();
        }
    });
});

    app.put('/tasks/:taskId', (request, response) => {
        const body = request.body;
        const task = {
        id: request.params.taskId,
        title: body.title,
        description: body.description,
        isDone: body.isDone,
        isPriority: body.isPriority
    };
        taskDAO.insert(task, (err, data) => {
            if (err) {
                response.status(500).send(err);
            } else {
                response.status(200).send(task);
            }
        });
    });

    app.delete('/tasks/:taskId', (request, response) => {
        taskDAO.remove(request.params.taskId, (err, data) => {
            if (err) {
                response.status(500).send(err);
            } else {
                response.status(200).send(data);
            }
        });
    });


app.post('/login', (req, resp) => {
    var body = req.body;
        if (body.username == 'zezinho' && body.password == 'ze123') {
            var token = jwt.sign({ username: 'usuario', role: 'admin' }, KEY, {
            expiresIn: 30000
        });
            resp.status(200).send({ auth: true, token });
        } else {
            resp.status(401).send({ auth: false, message: 'Error in username or password' });
        }
})
  
taskDAO.init((err, data) => {
    if (err) {
        console.log('Servidor estourou por causa de algum erro', err);
    } else {
        app.listen(3000, () => {
        console.log('Startou mané');
        });
    }
});
        