const express = require('express');
require('dotenv').config();
require('./models/db')

const User = require('./models/user')
var cors = require('cors')
var app = express()

var cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(cors())
const userRouter = require('./routes/user')

// app.use((req, res, next) => {
//     req.on('data',chunk=>{
//         const data=JSON.parse(chunk);
//         req.body=data;
//         next();
//     })
// })

//same as above
app.use(express.json())

//==============check password===========
// const test=async (email,password)=>{
//     const user=await User.findOne({email:email});
//     const result=await user.comparePassword(password);
//     console.log(result)
// }
// test('raj1@gmail.com','raj12346')

//=================================

// app.get('/test', async (req, res) => {
//   console.log(await User.findById({ _id: '63d5071552039223b958e72e' }))
// })

app.use(userRouter)

app.get('/logout', (req, res) => {
  res.clearCookie("jwtoken");
  try {
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {

    res.status(400).json({ success: false, message: "somthing went wronge" });
  }
})

app.get('/', (req, res) => {
  res.send('<h1>Hello</h1>');
});



app.listen(8000, () => {
  console.log('port is listening on 8000');
});