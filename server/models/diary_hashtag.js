module.exports = (sequelize, DataTypes) => {
  const diary_hashtag = sequelize.define(
    "diary_hashtag",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        type: DataTypes.DATE,
      },
    },
    {
      // charset: "utf8", // 한국어 설정
      // collate: "utf8_general_ci", // 한국어 설정
      tableName: "diary_hashtag", // 테이블 이름
      timestamps: true, // createAt & updateAt 활성화
    }
  );

  return diary_hashtag;
};
