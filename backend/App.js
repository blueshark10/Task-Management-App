const bodyParser = require('body-parser');
const cors=require('cors')
const taskController =require('./controllers/task.controller')
const userController =require('./controllers/user.controller')
const express = require('express')
const app = express();
let mongoose = require('mongoose');
const { checkJWTToken,verifyTitleLength } = require('./middleware/middleware');
const uri ='mongodb+srv://student100451:OxyHnvdfSiceQ4WZ@hyperion-dev-1234.eworbjc.mongodb.net/project62?retryWrites=true&w=majority';
mongoose.Promise = global.Promise;
mongoose.connect(uri);
mongoose.connection.on('error', function () {
  console.log('Could not connect to the database. Exiting now...');
  process.exit();
});
mongoose.connection.once('open', function () {
  console.log("Successfully connected to the database");
})

app.use(bodyParser.json());
app.use(cors());
const port = 4000

app.get('/', (req, res) => {
  res.send('Hello World!');
})


app.get('/login',cors(),checkJWTToken, userController.login)
app.post('/getTasks',cors(), taskController.findAll)
app.post('/getTasksAdmin',cors(), taskController.findAllAdmin)
app.post('/addTask',cors(),checkJWTToken,verifyTitleLength, taskController.create)
app.post('/markTaskCompleted',cors(),checkJWTToken, taskController.updateTaskCompleted)
app.post('/deleteTask',cors(),checkJWTToken, taskController.deleteOne)
app.post('/updateTask',cors(),checkJWTToken,verifyTitleLength, taskController.updateMany)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})