const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json());
app.use(cors())

let messagess = [];

app.listen(4000, () => console.log('Server running on port 4000!'))

app.post('/messages' , (req , res) => {

   //console.log(req.body)
    messagess.push({data: req.body.data , lastTime: req.body.lastTime});
    // console.log(req.body.data)
     console.log(messagess)
    res.status(200).end();
});

app.get('/messages' , (req , res) => {
  // console.log(req.query.date)
  let userDate = req.query.lastTime;
  console.log(userDate)
  if(userDate === 0)
    res.json(messagess)
  else
  {
    console.log("the array" , messagess)
    console.log("the value",userDate)
    const response =  messagess.filter((message) => {
      console.log(message.lastTime)
      if(message.lastTime > userDate){
      console.log(message.lastTime)
        return message}
    })
    res.json(response)
    console.log(response)
  }
  })