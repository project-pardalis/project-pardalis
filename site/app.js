process.env.AMBIENTE_PROCESSO = "desenvolvimento"

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
const chamadoRouter = require("./src/routes/rotas")
// RoutersMarco

/* João */
const joaoRouter = require("./src/routes/joao.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuariosRouter);
app.use("/maquina", maquinaRouter);
app.use('/dash', dashRouter);
app.use('/jira', jiraRouter);
app.use('/rotas', chamadoRouter)

// RoutersMarco 
app.use('/medidas', medidasRouter);
app.use('/media', mediaRouter);
app.use("/mensagem", msgRouter);
// RoutersMarco

/* João */
app.use('/npd', joaoRouter);

app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA}`);
});
