import { mail } from './src/nodemailer'
const express = require('express')
const app = express()
import cors from 'cors'
import bodyParser from 'body-parser'

//log all request
//request object, response object, next function
const posthandler = (req:any,res:any,next:any) => {
    //log the request
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    // you need to declare, coz your server will get stuck
    next();
}
//status 404
const index = (req:any, res:any) => {
  res.json({reject:'request rejected'})
}

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(posthandler);

const sendMessage = (req:any,res:any) => {
  
  const count = req.query.count;

  const msg = {
    mailfrom: "damienfahey@gmail.com",
    mailto: "bjrayel@ittc.up.edu.ph",
    subject: "Counter every 10th",
    messagetxt: `It's the counter again, ${count}`,
    messagehtml: `<h3>Yeep! Streak at ${count}</h3>`
  }
  mail(msg.mailfrom,msg.mailto,msg.subject,msg.messagetxt,msg.messagehtml);
  res.json({resolve:'sent message'})
}

app.route('/api/message/send').get(sendMessage);
app.route('*').get(index).post(index);

const listener = app.listen(process.env.PORT || 5000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
  
})
