import usuario, { usuarios } from "./model/usuario.js";
import mongoose from "mongoose";

export default (io) => {
  const SELECT = (socket) => {
    usuario.conversacionSchema.find()
      .populate({
        path: 'usuario_id',
        select: 'nombre contrasena'
      })
      .populate({
        path: 'mensaje_id',
        select: 'message'
      })
      .then((conversaciones) => {
        console.log(conversaciones)
        conversaciones.map(conv=>{
          socket.emit('server:SELECTTT', conv.usuario_id.nombre);
          socket.emit('server:SELECTT', conv.mensaje_id);
        })
      socket.emit('server:SELECT', conversaciones); // Emitir al cliente específico
      })
      .catch((err) => {
        console.error(err);
        socket.emit('server:error', { message: 'Error retrieving conversations' });
      });
  };
  
  io.on("connection", (socket) => {
    console.log(socket.id);
    socket.emit("server", "Connect on sever node in port 3000");

    const emitUsuarios = async () => {
      const usuarios = await usuario.usuarios.find();
      socket.emit("server:usuarios", usuarios);

    };
     emitUsuarios();

    socket.on("client:usuarios", async (data) => {
      const Newdata = new usuario.usuarios({
        nombre: data.nombre,
        contrasena: data.contrasena,
      });
      const saveUsuario = await Newdata.save();
      io.emit("server:newUsuario1", saveUsuario);
    
    });
    const messages = async () => {
      const usuarios = await usuario.mensajes.find();
      
      socket.emit("server:Get", usuarios);
      usuarios.map((mess) => {
        socket.emit("server:messages", mess._id);
      });
        
    };
     messages();
    socket.on("client:userID", async (id) => {
      socket.on("client:UserMessage", async (messages) => {
        const NewMessage = new usuario.mensajes({
          usuario: id,
          message: messages,
        });
        const saveMessage = await NewMessage.save();
        // console.log(saveMessage)
        socket.emit("server:idMessage", saveMessage);
      });
    });
    const salas = async () => {
      const Salas = await usuario.conversacionSchema.find();
      socket.emit("server:salas", Salas);
    };
    salas();

    socket.on("client:userDos", async (userid) => {
      socket.emit("server:useriodos",userid)
      socket.on("client:bord", async (sala) => {
        const NewSala = new usuario.conversacionSchema({
          usuario_id: userid,
          mensaje_id: sala,
        });
        const SaveSala = await NewSala.save();
      });
    });

    socket.on("client:userDos", async (userid) => {
         
    })
      SELECT(socket)
    
  });
  io.of("/admin").on("connection", (socket) => {
    socket.on("logeado:res", (req) => {
      console.log(req);
    });
  });
};
