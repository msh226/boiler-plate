const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
  name: {
    type: String, //타입
    maxlength: 50 // 최대 길이
  },
  email: {
    type: String,
    trim: true, // 공백 제거
    unique: 1 // 중복 불가
  },
  password: {
    type: String,
    maxlength: 70
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0 // 기본값
  },
  image: {
    type: String,
  },
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
})

userSchema.pre('save', function (next) {
  // save 함수가 호출되기 전에 호출
  // next콜백은 save전에 수행할 작업을 마치고 save로 넘어가는 콜백함수

  var user = this; // userSchema

  if (user.isModified('password')) { // password가 변환될 때만

    bcrypt.genSalt(saltRounds, function (err, salt) { // 비밀번호 암호화
      if (err) return next(err) // 에러 발생시 에러 리턴

      bcrypt.hash(user.password, salt, function (err, hash) { // 해쉬 생성
        if (err) return next(err) // 에러 발생시 에러 리턴
        user.password = hash // 해쉬 생성 성공시 password를 hash로 교체
        next();
      })
    })
  } else {
    next();
  }
})

userSchema.methods.comparePassword = function (plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  })
}

userSchema.methods.generateToken = function (callback) {
  var user = this; // // userSchema
  var token = jwt.sign(user._id.toHexString(), 'secretToken');
  // user._id + 'scretToken' = token

  user.token = token
  user.save(function (err, user) {
    if (err) return callback(err);
    callback(null, user);
  })
}

userSchema.statics.findByToken = function (token, callback) {
  var user = this;

  // 토큰을 decode 한다
  jwt.verify(token, 'secretToken', function (err, decoded) {

    // 유저 아이디를 이용해서 유저를 찾고
    // 클라이언트에서 가져온 토큰과 DB에 보관된 토큰이 일치하는지 확인
    User.findOne({ "_id": decoded, "token": token }, function (err, user) {
      if (err) return callback(err)
      callback(null, user)
    })
  })
}

const User = mongoose.model('User', userSchema) // 모델 생성

module.exports = { User }