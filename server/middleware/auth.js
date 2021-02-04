const { User } = require('../models/User');

let auth = (req, res, next) => {
  // 인증 처리를 하는 곳

  // 클라이언트 쿠키에서 토큰을 가져옴
  let token = req.cookies.x_auth;

  // 토큰 복호화 하고 유저 조회
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true }) // 조회 결과가 없을 때

    req.token = token;
    req.user = user;
    next(); // 다음 단계로 이동
  })
  // 유저가 있으면 인증 ok
  // 유저가 없으면 인증 No
}


module.exports = { auth };