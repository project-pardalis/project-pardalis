process.env.AMBIENTE_PROCESSO = "desenvolvimento"

const express = require("express");
const cors = require("cors");
const path = require("path");
const PORTA = 3000;

const app = express();

const indexRouter = require("./src/routes/index");
const abrirChamadosRouter = require("./src/routes/abrirChamados")
// const visualizarChamadosRouter = require("./src/routes/visualizarChamados")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/abrirChamados", abrirChamadosRouter)
// app.use("/visualizarChamados", visualizarChamadosRouter)

app.set('view engine', 'html');

app.listen(PORTA, function () {
    console.log(`Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar: http://localhost:${PORTA}`);
});