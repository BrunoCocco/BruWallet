const express = require("express");
const path = require("path");
const db = require("./db/database");

const app = express();

app.use(express.urlencoded({ extended: true }));

// 🟢 Servimos la raíz (index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 🟢 Servir los recursos estáticos (css, js, pages, etc.)
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/js", express.static(path.join(__dirname, "js")));
app.use("/pages", express.static(path.join(__dirname, "pages")));

// 🟢 Ruta para registrar usuario
app.post("/registrar", (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).send("❌ Faltan datos del formulario");
  }

  const query = `
    INSERT INTO usuarios (usuario, contraseña)
    VALUES (?, ?)
  `;

  // Usamos 'nombre' como usuario, y 'password' como contraseña
  db.run(query, [nombre, password], function (err) {
    if (err) {
      console.error("❌ Error al registrar usuario:", err.message);
      return res.status(400).send("❌ Error al registrar usuario (puede ya existir)");
    }

    console.log("✅ Nuevo usuario guardado con ID:", this.lastID);

    // Guardar también email en tabla transacciones (opcional más adelante)
    const ahora = new Date();
    const fecha = ahora.toLocaleDateString("es-ES");
    const hora = ahora.toLocaleTimeString("es-ES");

    db.run(
      `INSERT INTO transacciones (usuario_id, tipo, monto, fecha)
       VALUES (?, ?, ?, ?)`,
      [this.lastID, "registro", 0, `${fecha} ${hora}`],
      (err2) => {
        if (err2) console.error("Error en transacciones:", err2.message);
      }
    );

    res.send(`✅ Usuario ${nombre} registrado con éxito (ID: ${this.lastID})`);
  });
});


// 🟢 Ruta para ver los usuarios
app.get("/usuarios", (req, res) => {
  db.all(`SELECT * FROM usuarios`, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      return res.status(500).send("Error al obtener usuarios");
    }
    res.json(rows);
  });
});

// 🟢 Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
