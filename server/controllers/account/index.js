const { account } = require("../../models");
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

      const accounts = await account.findAll({
        where: { trip_id },
      });

      return res.status(200).send({ accounts });
    } catch (err) {
      console.error(err);
      return res.status(500).send("Something Went Wrong");
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
      const { category, item_name, price, paid_person, currency, write_date } =
        req.body;
      const accountInfo = await account.create({
        category,
        item_name,
        price,
        paid_person,
        currency,
        write_date,
        trip_id,
      });

      return res.status(200).send({
        account_id: accountInfo.id,
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

      const { trip_id, account_id } = req.params;
      try {
        await account.destroy({
          where: { id: account_id },
        });
        return res.status(200).send({ message: "Account Deleted" });
      } catch (err) {
        return res.status(401).send({ message: "Incorrect Info" });
      }
    } catch (err) {
      console.err(err);
      return res.status(500).send("Something Went Wrong");
    }
  },
};
