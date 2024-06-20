// import { MensajesRender } from "./ui";

const socket = io();

export const userGET = (callback) => {
  socket.on("server:usuarios", callback);
};
//esto me servira para saber el id de mi amigo o usuario
export const userDos = (callback) => {
  socket.emit("client:userDos", callback);
};

export const UserMessage = (callback) => {
  socket.emit("client:UserMessage", callback);
};
export const MessagesListGet = (callback) => {
  socket.on("server:messages", callback);
};

socket.on("server:messages", (sala) => {
  socket.emit("messageId:sala", sala);
});

export const Getmessages = (nom) => {
  socket.on("server:Get", nom);
};

export const salasEnvio = () => {
  socket.on("server:idMessage", (saveMessage) => {
    console.log(saveMessage._id);
    socket.emit("client:bord", saveMessage._id);
  });

  userDos();
};

export const salasDeDos = (callback) => {
  socket.on("server:salas", callback);
};
export const mostrarInfo = (callback) => {
  socket.on("server:salas", callback);
};
export const SELEC = () => {
  socket.on("serverJ", (data) => {
    console.log(data);
  });
};
export const SELECT = (callback) => {
  socket.on("server:SELECTT",(callback=>{
    console.log(callback)
  }))
};
SELECT()  
export const findt = (callback) => {
  io.emit("server:newUsuario1", callback);
}

let usuarioos = localStorage.getItem("persona-nombre");
usuarioos = JSON.parse(usuarioos);
usuarioos.forEach((element) => {
  console.log(element);
  socket.emit("client:userID", element._id);
});
