module.exports = (sequelize, DataTypes) => {
  const trip = sequelize.define(
    "trip",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      country: {
        type: DataTypes.STRING,
      },
      start_date: {
        type: DataTypes.STRING,
      },
      end_date: {
        type: DataTypes.STRING,
      },
      totalPrice: {
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
      tableName: "trip", // 테이블 이름
      timestamps: true, // createAt & updateAt 활성화
    }
  );

  return trip;
};
