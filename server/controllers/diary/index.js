const { diary } = require("../../models");
const { isAuthorized } = require("../tokenHandler");

module.exports = {
  get: async (req, res) => {
    try {
      const userInfo = isAuthorized(req);
      if (!userInfo) {
        //토큰이 없거나 검증된 토큰이 아닌경우
        return res.status(401).send("Invalid Token");
      }

      const { trip_id } = req.params;

      const diaries = await diary.findAll({
        where: { trip_id },
      });

      return res.status(200).send({ diaries });
    } catch (err) {
      console.error(err);
      return res.status(500).send("something went wrong");
    }
  },

  post: async (req, res) => {
    try {
      const userInfo = isAuthorized(req);
      if (!userInfo) {
        //토큰이 없거나 검증된 토큰이 아닌경우
        return res.status(401).send("Invalid Token");
      }
      const { trip_id } = req.params;
      const { location, content, write_date } = req.body;
      const diaryInfo = await diary.create({
        location,
        content,
        write_date,
        trip_id,
      });

      return res.status(200).send({
        diary_id: diaryInfo.id,
        message: "post succesfully created",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).send("something went wrong");
    }
  },

  delete: async (req, res) => {
    try {
      const userInfo = isAuthorized(req);
      if (!userInfo) {
        //토큰이 없거나 검증된 토큰이 아닌경우
        return res.status(401).send("Invalid Token");
      }

      const { diary_id, trip_id } = req.params;

      try {
        await diary.destroy({
          where: { id: diary_id },
        });
        return res.status(200).send({ message: "diary Deleted" });
      } catch (err) {
        return res.status(401).send({ message: "Incorrect Info" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send("something went wrong");
    }
  },
};
