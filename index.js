const express = require('express') // express 모듈 가져오기
const app = express() // 새로운 express 앱을 만들기
const port = 3000 // 포트 번호

const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://hansol:kims2727@cluster0.qfuw5.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('DB 연결성공'))
  .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})