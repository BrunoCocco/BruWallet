const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Ruta absoluta al archivo .db dentro de la carpeta /db
const dbPath = path.resolve(__dirname, "wallet.db");

// Crear o abrir la base de datos
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ Error al conectar con SQLite:", err);
  } else {
    console.log("✅ Conectado a la base de datos SQLite:", dbPath);
  }
});

// Crear tabla de usuarios
db.run(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario TEXT UNIQUE NOT NULL,
    contraseña TEXT NOT NULL
  );
`);

// Crear tabla de transacciones
db.run(`
  CREATE TABLE IF NOT EXISTS transacciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    tipo TEXT NOT NULL,
    monto REAL NOT NULL,
    fecha TEXT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
  );
`);

module.exports = db;
