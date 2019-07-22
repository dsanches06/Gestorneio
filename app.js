"use strict";
const express = require("express");
const requestHandlers = require("./scripts/request-handlers.js");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("www", {
    "index": "index.html"
}));

//roteamento
app.get("/localidades", requestHandlers.getLocalidades);
app.get("/generos", requestHandlers.getGeneros);
app.get("/tiposdetorneio", requestHandlers.getTiposDeTorneio);

app.get("/jogadores", requestHandlers.getJogadores);
app.post("/jogador/novo", requestHandlers.createUpdateJogador);
app.put("/update/jogador/:id", requestHandlers.createUpdateJogador);
app.delete("/delete/jogador/:id", requestHandlers.removerJogador);

app.get("/equipas", requestHandlers.getEquipas);
app.post("/equipa/novo", requestHandlers.createUpdateEquipa);
app.put("/update/equipa/:id", requestHandlers.createUpdateEquipa);
app.delete("/delete/equipa/:id", requestHandlers.removerEquipa);

app.get("/torneios", requestHandlers.getTorneios);
app.get("/torneio/tipo/:id", requestHandlers.getTorneiosPorTipo);
app.get("/torneio/modalidade/:id", requestHandlers.getTorneiosPorModalidade);
app.post("/torneio/novo", requestHandlers.createUpdateTorneio);
app.put("/update/torneio/:id", requestHandlers.createUpdateTorneio);
app.put("/update/vencedor/torneio/:id", requestHandlers.updateVencedorTorneio);
app.delete("/delete/torneio/:id", requestHandlers.removerTorneio);

app.get("/modalidades", requestHandlers.getModalidades);
app.post("/modalidade/novo", requestHandlers.createUpdateModalidade);
app.put("/update/modalidade/:id", requestHandlers.createUpdateModalidade);
app.delete("/delete/modalidade/:id", requestHandlers.removerModalidade);

app.get("/equipas/torneio/:id", requestHandlers.getEquipasNoTorneio);
app.post("/equipa/torneio/adicionar", requestHandlers.createEquipaNoTorneio);

app.get("/jogadores/torneio/:id", requestHandlers.getJogadoresNoTorneio);
app.post("/jogador/torneio/adicionar", requestHandlers.createJogadorNoTorneio);

app.get("/estatisticas", requestHandlers.getEstatisticas);
app.post("/estatistica/novo", requestHandlers.createEstatistica);
app.get("/estatisticas/equipa/:id", requestHandlers.getEstatisticaPorEquipa);
app.get("/estatisticas/jogador/:id", requestHandlers.getEstatisticaPorJogador);

app.listen(8081, function () {
    console.log("Server running at http://localhost:8081");
});