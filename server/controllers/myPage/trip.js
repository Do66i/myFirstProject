const { trip } = require("../../models");
const { isAuthorized } = require("../tokenHandler");

module.exports = {
  get: async (req, res) => {
    try {
      const userInfo = isAuthorized(req);
      if (!userInfo) {
        //토큰이 없거나 검증된 토큰이 아닌경우
        return res.status(401).send("Invalid Token");
      }
      const trips = await trip.findAll({
        where: { user_id: userInfo.id },
      });

      return res.status(200).send({
        trips,
      });
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

      const { country, start_date, end_date, totalPrice } = req.body;
      const createdTrip = await trip.create({
        user_id: userInfo.id,
        country,
        start_date,
        end_date,
        totalPrice,
      });

      return res.status(200).send({
        tripInfo: {
          id: createdTrip.id,
        },
        message: "Posted Successfully",
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
        return res.status(401).send("Invalid Token");
      }

      try {
        await trip.destroy({
          where: { id: req.body.trip_id },
        });
        return res.status(200).send({ message: "Trip Deleted" });
      } catch (err) {
        return res.status(401).send({ message: "Incorrect Info" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send("something went wrong");
    }
  },
};
