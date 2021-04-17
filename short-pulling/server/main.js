const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json());
app.use(cors())

const messagess = [];

app.listen(4000, () => console.log('Server running on port 4000!'))

app.post('/messages' , (req , res) => {
  console.log(req.body)
    messagess.push(req.body);
    console.log(req.body.data)
    console.log(messagess)
    res.status(200).end();
});

app.get('/messages' , (req , res) => {
    console.log(res)
    res.json({messagess})
  })