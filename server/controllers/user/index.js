const { user } = require("../../models");
const jwt = require("jsonwebtoken");
const { isAuthorized } = require("../tokenHandler");
require("dotenv").config();

module.exports = {
  signin: {
    // 로그인
    post: async (req, res) => {
      try {
        const { user_id, password } = req.body; //아이디와 패스워드를 클라이언트로 부터 받아옴
        const result = await user.findOne({ where: { user_id, password } }); //가입된 유저가 맞는지 확인 과정

        if (result) {
          const payload = {
            id: result.id,
            user_id: result.user_id,
            password: result.password,
          };
          //있다면 200 없다면 401
          //있다면 토큰을 같이 보내준
          const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
            expiresIn: "1h",
          });
          const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
            expiresIn: "1d",
          });
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
          });
          return res.status(200).send({
            data: { accessToken },
            message: `환영합니다`,
          });
        } else {
          return res.status(401).send({ message: "wrong user_id or password" });
        }
      } catch (err) {
        // 서버에러
        console.error(err);
        return res
          .status(500)
          .send({ message: "sorry can't process your request" });
      }
    },
  },
  signout: {
    // 로그아웃
    post: async (req, res) => {
      try {
        res.clearCookie("refreshToken"); // 쿠키 삭제
        return res.status(200).send({ message: "Successfully logged out" });
      } catch (err) {
        //서버에러
        console.error(err);
        return res
          .status(500)
          .send({ message: "sorry can't process your request" });
      }
    },
  },
  signup: {
    // 회원가입
    post: async (req, res) => {
      try {
        const { user_id, password } = req.body;
        const userInfo = await user.findOne({ where: { user_id } }); //해당 아이디로 회원정보 중복 조회

        if (userInfo) {
          //해당 아이디로 벌써 가입한적이 있다면
          return res
            .status(400)
            .send({ data: null, message: "user_id already exists" });
        }

        await user.create({
          user_id,
          password,
        });

        return res.status(201).send({ message: "signup ok" });
      } catch (err) {
        console.error(err);
        return res
          .status(500)
          .send({ message: "sorry can't process your request" });
      }
    },
  },

  withdrawal: {
    // 회원탈퇴
    delete: async (req, res) => {
      const userInfo = isAuthorized(req);
      try {
        const { user_id, password } = userInfo;
        await user.destroy({
          where: { user_id, password },
        });
        return res.status(200).send({ message: "Account Deleted" });
      } catch (err) {
        console.error(err);
        return res
          .status(500)
          .send({ message: "sorry can't process your request" });
      }
    },
  },
};
