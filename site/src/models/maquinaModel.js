var database = require("../database/config")

async function appendMachine(fkEmpresa, hashMaquina, nomeMaquina) {
    let existsHash = await database.executar(`SELECT * FROM Maquina WHERE hashMaquina = '${hashMaquina}'`);
    if (existsHash.length == 0) {
        try {
            await database.executar(`INSERT INTO Maquina (fkEmpresa, hashMaquina, nomeMaquina, sistemaOperacional, onCloud) VALUES ('${fkEmpresa}', '${hashMaquina}', '${nomeMaquina}', "", 0)`);
            console.log(`Maquina ${nomeMaquina} cadastrada com sucesso!`);
            return true
        } catch (error) {
            return false;
        }

    }
}

module.exports = {
    appendMachine,
};