process.env.AMBIENTE_PROCESSO = "producao"

const express = require("express");
const cors = require("cors");
const path = require("path");
const PORTA = 3000;

const app = express();

const indexRouter = require("./src/routes/index");
const maquinaRouter = require("./src/routes/maquina");
const usuariosRouter = require("./src/routes/usuarios");
const dashRouter = require("./src/routes/dash");
const jiraRouter = require("./src/routes/jira");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuariosRouter);
app.use("/maquina", maquinaRouter);
app.use('/dash', dashRouter);
app.use('/jira', jiraRouter);

app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA}`);
});