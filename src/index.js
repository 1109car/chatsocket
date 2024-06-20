import app from "./app.js";
import { Server as websocketserver } from "socket.io";
import http from "http"

import socket from './socket.js'
import { connectDB } from "./db.js";


connectDB()
const server= http.createServer(app)
const creado = server.listen(3000)
const io = new websocketserver(creado)

socket(io)
