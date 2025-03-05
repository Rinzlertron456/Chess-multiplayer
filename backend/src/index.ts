import { WebSocketServer } from "ws";
import { GameManager } from "./GameManager";
const cors = require("cors");
const app = require("express");

app.use(
  cors({
    origin: "https://chess-multiplayer-three.vercel.app/",
  })
);

const wss = new WebSocketServer({ port: 8085 });

const gameManager = new GameManager();

wss.on("connection", function connection(ws) {
  gameManager.addUser(ws);
  ws.on("disconnect", () => gameManager.removeUser(ws));
});
