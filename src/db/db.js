const { Sequelize } = require("sequelize");

// Configura la conexión a la base de datos
const sequelize = new Sequelize("log_reg_app", "root", "", {
  host: "localhost", // Cambia esto si tu base de datos está en un host diferente
  dialect: "mysql",
});

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
