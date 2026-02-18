const express = require("express");
const pool = require("./db");

const app = express();
const PORT = 3000;

/* MIDDLEWARES */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/* ================= CRUD ================= */

/* CREATE */
app.post("/usuarios", async (req, res) => {
  const { nome, email } = req.body;

  await pool.query(
    "INSERT INTO usuarios (nome, email) VALUES ($1, $2)",
    [nome, email]
  );

  res.redirect("/");
});

/* READ */
app.get("/usuarios", async (req, res) => {
  const usuarios = await pool.query("SELECT * FROM usuarios ORDER BY id");
  res.json(usuarios.rows);
});

/* UPDATE */
app.put("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;

  await pool.query(
    "UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3",
    [nome, email, id]
  );

  res.sendStatus(200);
});

/* DELETE */
app.delete("/usuarios/:id", async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM usuarios WHERE id = $1", [id]);
  res.sendStatus(200);
});

/* START */
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
