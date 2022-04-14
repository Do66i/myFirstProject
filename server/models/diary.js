module.exports = (sequelize, DataTypes) => {
  const diary = sequelize.define(
    "diary",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      location: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.STRING,
      },
      write_date: {
        type: DataTypes.DATE,
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
      tableName: "diary", // 테이블 이름
      timestamps: true, // createAt & updateAt 활성화
    }
  );

  return diary;
};
