const express = require('express') // express 모듈 가져오기
const app = express() // 새로운 express 앱을 만들기

const bodyParser = require('body-parser'); // body-parser 모듈 가져오기
const cookieParser = require('cookie-parser');
const { User } = require("./models/User"); // User 모듈 가져오기
const { auth } = require('./middleware/auth');
const config = require('./config/key');


app.use(bodyParser.urlencoded({ extended: true }));
// bodyParser가 클라이언트에서 오는 데이터를 서버에서 분석해서 가져올 수 있도록 함
// ex) application/x-www-form-urlencoded

app.use(bodyParser.json());
// json 타입으로 된 데이터를 분석해서 가져올 수 있게 함
//ex) application/json

app.use(cookieParser())

const mongoose = require('mongoose')

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('DB 연결성공'))
  .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hewfwefwef')
})

app.get('/api/hello', (req, res) => {
  res.send("안녕하세요")
})

app.post('/api/users/register', (req, res) => {

  // 회원 가입 할 때 필요한 정보들을 클라이언트에서 가져오면
  // 그것들을 데이터 베이스에 추가
  const user = new User(req.body)

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })
})


app.post('/api/users/login', (req, res) => {
  // 요청된 이메일을 DB에서 조회
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다"
      })
    }

    // 요청된 이메일이 DB에 있다면 비밀번호가 일치하는지 조회
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: '비밀번호가 틀렸습니다' })

      // 비밀번호까지 일치한다면 토큰 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 쿠키에 저장
        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
      })
    })
  })
})

// 미들웨어 : 리퀘스트를 받고 콜백함수를 받기 전의 중간 과정
app.get('/api/users/auth', auth, (req, res) => {

  // 여기까지 미들웨어를 통과했다는 것은 Auth가 true라는 뜻
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true, // role이 1이면 일반유저 이외에는 관리자
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})


app.get('/api/users/logout', auth, (req, res) => {
  // DB를 조회하고 업데이트하는 함수
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "" }, // 토큰 삭제
    (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true
      })
    })
});

const port = 5000 // 포트 번호

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


