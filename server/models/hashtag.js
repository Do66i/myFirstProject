module.exports = (sequelize, DataTypes) => {
  const hashtag = sequelize.define(
    "hashtag",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      content: {
        type: DataTypes.STRING,
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
      tableName: "hashtag", // 테이블 이름
      timestamps: true, // createAt & updateAt 활성화
    }
  );

  return hashtag;
};
