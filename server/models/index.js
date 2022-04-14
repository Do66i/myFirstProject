"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: "remembertrip.clrcjejkgt1l.ap-northeast-2.rds.amazonaws.com",
    port: 13306,
    logging: console.log,
    dialect: "mysql",
    ssl: "Amazon RDS",
    pool: { maxConnections: 5, maxIdleTime: 30 },
    language: "en",
  });
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.user.hasMany(db.trip, { onDelete: "cascade", foreignKey: "user_id" });
db.trip.belongsTo(db.user, { onDelete: "cascade", foreignKey: "user_id" });
db.trip.hasMany(db.diary, { onDelete: "cascade", foreignKey: "trip_id" });
db.trip.hasMany(db.account, { onDelete: "cascade", foreignKey: "trip_id" });
db.diary.belongsTo(db.trip, { onDelete: "cascade", foreignKey: "trip_id" });
db.diary.belongsTo(db.trip, { onDelete: "cascade", foreignKey: "trip_id" });
db.account.belongsTo(db.trip, { onDelete: "cascade", foreignKey: "trip_id" });
db.diary.belongsToMany(db.hashtag, {
  through: "diary_hashtag",
  foreignKey: "diary_id",
  sourceKey: "id",
  onDelete: "cascade",
});
db.hashtag.belongsToMany(db.diary, {
  through: "diary_hashtag",
  foreignKey: "hashtag_id",
  sourceKey: "id",
  onDelete: "cascade",
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
