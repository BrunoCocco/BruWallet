const sqlite3 = require('sqlite3').verbose();

// Crear la base de datos (si no existe, la crea automáticamente)
const db = new sqlite3.Database('./db/wallet.db', (err) => {
  if (err) {
    console.error('Error al abrir la base de datos:', err);
  } else {
    console.log('Conectado a la base de datos');
  }
});

// Crear la tabla de usuarios si no existe
db.run(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario TEXT UNIQUE NOT NULL,
    contraseña TEXT NOT NULL
  );
`);

// Crear la tabla de transacciones si no existe
db.run(`
  CREATE TABLE IF NOT EXISTS transacciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    tipo TEXT NOT NULL,  -- 'entrada' o 'salida'
    monto REAL NOT NULL,
    fecha TEXT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
  );
`);
