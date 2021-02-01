const mongoose = require('mongoose')

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
    maxlength: 50
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

const User = mongoose.model('User', userSchema); // 모델 생성

module.exports = { User }