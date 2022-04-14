module.exports = (sequelize, DataTypes) => {
  const account = sequelize.define(
    "account",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      category: {
        type: DataTypes.STRING,
      },
      item_name: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.INTEGER,
      },
      paid_person: {
        type: DataTypes.STRING,
      },
      currency: {
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
      tableName: "account", // 테이블 이름
      timestamps: true, // createAt & updateAt 활성화
    }
  );

  return account;
};
