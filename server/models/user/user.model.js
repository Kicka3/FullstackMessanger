/** id — это целочисленный первичный ключ, который автоматически инкрементируется.

 username — это строка, которая не может быть null.

 passhash — это строка, содержащая хэш пароля, которая также не может быть null.

 userid — это UUID, который генерируется автоматически при создании пользователя (используя Sequelize.UUIDV4), не может быть null и должен быть уникальным. */


const Sequelize = require("sequelize");
const config = require("../../config/configSequelize.json");

const sequelize = new Sequelize(
   config.development.database,
   config.development.username,
   config.development.password,
   {
      host: config.development.host,
      dialect: config.development.dialect,
   }
);

const User = sequelize.define('Users', {
   id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
   },
   username: {
      type: Sequelize.STRING(28),
      allowNull: false,
      unique: true,
   },
   passhash: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   userid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      unique: true,
   },
});

sequelize.sync({ force: false }).then(() => {
   console.log('Model User was synchronized successfully.');
});

module.exports = User;