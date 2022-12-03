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
// RoutersMarco
const medidasRouter = require("./src/routes/medidas");
const mediaRouter = require("./src/routes/media");
const msgRouter = require("./src/routes/msg");
// RoutersMarco

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuariosRouter);
app.use("/maquina", maquinaRouter);
app.use('/dash', dashRouter);
app.use('/jira', jiraRouter);

// RoutersMarco 
app.use('/medidas', medidasRouter);
app.use('/media', mediaRouter);
app.use("/mensagem", msgRouter);
// RoutersMarco

app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA}`);
});
