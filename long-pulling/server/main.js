const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json());
app.use(cors())

const subscribers = {};

app.listen(4000, () => console.log('Server running on port 4000!'))


app.post('/messages/subscribe' , (req,res) => {
  console.log(req.body)
  const { id } = req.body
  subscribers[id] = res
  req.on('close' , () => {
    delete subscribers[id]
  })
})

app.post("/messages" , (req , res) => {
  console.log("server before")
  Object.entries(subscribers).forEach(([id, response]) => {
    console.log(response)
    delete subscribers[id]
    response.json(req.body)
 })
  res.json({status: "700"});
})

