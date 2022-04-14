const { user } = require("../../models");

module.exports = {
  patch: async (req, res) => {
    try {
      const { user_id, password, newpassword } = req.body;
      const userInfo = await user.findOne({
        where: { user_id, password },
      });

      if (!userInfo) {
        return res.status(401).send("Wrong user_id or password");
      } else {
        await userInfo.update({ password: newpassword });
        await userInfo.save();
        return res.status(200).send("password change succeeded");
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send("something went wrong");
    }
  },
};
