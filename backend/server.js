require("dotenv").config();

const express = require('express');
const app = express();
const formData = require('express-form-data');
const cors = require('cors')

const jwt = require('jsonwebtoken');

app.use(formData.parse());
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
app.options('*', cors())
app.use(cors())

app.get('/api/private' ,authenticateToken , (req, res) => {
  res.status(200).send({ message: 'This is private Page' , user : req.user});
})

app.get('/api/public'  , (req, res) => {
  res.status(200).send({ message: 'This is public Page' });
})

app.get('/api/login' ,async (req, res) => {
  try{
    const username = req.query.username;
    const password = req.query.password;
    console.log(username, password , 'login');

    if( !username || !password ) return res.status(401).send({ message: 'Username or Password is missing' });

    if( username === 'admin@admin.com' && password === 'admin' ){
      const accessToken = generateAccessToken({ name : username , password : password });
      res.status(200).send({ message: 'Login success', accessToken : accessToken });
    }else{
      res.status(401).send({ message: 'Username or Password is incorrect' });
    }

  }catch(err){
    res.status(500).send({ message: 'Error' });
  }
})

app.get('/api/auth' , authenticateToken, (req, res) => {

  if(req.user.name !== 'admin@admin.com' && req.user.password !== 'admin') return res.status(403).send({ message: 'Not authorized' });
  const accessToken = generateAccessToken({ name : req.user.name , password : req.user.password  });
  res.status(200).send({ message: 'This is auth page' , accessToken : accessToken});
})

function generateAccessToken(user) {
  return jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '10s' });
}


function authenticateToken (req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  })
}

app.listen(3001 , () => {
  console.log("server is running on port 3001")
})

// using thunder client, an extension on vs code just like postman to test the api