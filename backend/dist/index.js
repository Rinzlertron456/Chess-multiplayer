"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const GameManager_1 = require("./GameManager");
// const cors = require("cors");
// const app = require("express");
// app.use(
//   cors({
//     origin: "https://chess-multiplayer-three.vercel.app/",
//   })
// );
const wss = new ws_1.WebSocketServer({ port: 8085 });
const gameManager = new GameManager_1.GameManager();
wss.on("connection", function connection(ws) {
    gameManager.addUser(ws);
    ws.on("disconnect", () => gameManager.removeUser(ws));
});
