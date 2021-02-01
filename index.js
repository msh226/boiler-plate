const express = require('express') // express 모듈 가져오기
const app = express() // 새로운 express 앱을 만들기
const port = 5000 // 포트 번호

const bodyParser = require('body-parser'); // body-parser 모듈 가져오기
const { User } = require("./models/User"); // User 모듈 가져오기

const config = require('./config/key');


app.use(bodyParser.urlencoded({ extended: true }));
// bodyParser가 클라이언트에서 오는 데이터를 서버에서 분석해서 가져올 수 있도록 함
// ex) application/x-www-form-urlencoded

app.use(bodyParser.json());
// json 타입으로 된 데이터를 분석해서 가져올 수 있게 함
//ex) application/json

const mongoose = require('mongoose')

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('DB 연결성공'))
  .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hewfwefwef')
})

app.post('/register', (req, res) => {

  // 회원 가입 할 때 필요한 정보들을 클라이언트에서 가져오면
  // 그것들을 데이터 베이스에 추가
  const user = new User(req.body)
  console.log(user)

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


