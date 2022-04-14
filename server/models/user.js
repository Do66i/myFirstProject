module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user_id: {
        type: DataTypes.STRING,
      },
      password: {
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
      tableName: "user", // 테이블 이름
      timestamps: true, // createAt & updateAt 활성화
    }
  );

  return user;
};
