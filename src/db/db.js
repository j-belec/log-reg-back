const { Sequelize } = require("sequelize");

// Configura la conexión a la base de datos
const sequelize = new Sequelize(
  "bjz7xxm6nwxcpbtnspmp",
  "uqdmjnx4zjhhlcg5",
  "idynXaooCeRYWBqfDPov",
  {
    host: "bjz7xxm6nwxcpbtnspmp-mysql.services.clever-cloud.com",
    dialect: "mysql",
  }
);

// Verifica la conexión a la base de datos
async function conectarBaseDeDatos() {
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida correctamente.");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
}

// Llama a la función para conectar a la base de datos
conectarBaseDeDatos();

module.exports = sequelize;
