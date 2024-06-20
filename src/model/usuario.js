import { AggregationCursor, ObjectId,  } from "mongodb";
import { Schema, model, mongoose,  } from "mongoose";


// mongoose.connect('mongodb://localhost:27017/chat', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
// Definir esquema para Usuario
export const usuarios= new mongoose.Schema({
    nombre: String,
    contrasena:String,
    
            
        }, {
            timestamps: true,
        });

// Definir esquema para Mensaje
export const mensajeSchema = new mongoose.Schema({
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'usuarios' }, // Referencia al modelo Usuario
  message: String,
  timestamp: Date
});
export const conversacionSchema = new mongoose.Schema({
    usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'usuarios' },//se le envia el id del amigo a enviar
    mensaje_id: { type: mongoose.Schema.Types.ObjectId, ref: 'mensajeSchema' }//id del mensaje llegado
  });
    // Consulta y población de datos
  
// export const SELECTJOIN = db.usuarios.aggregate(
//   [
//     {
//       $match:{
//         _id: ObjectId('6659ee05c1376e9c84dd8e5d')
//       }
//     },
//     {
//       $lookup:{
//         from:"mensajeschemas",
//         localField:"_id",
//         foreignField:"usuario",
//         as:"colecion"
//       }
//     },
//     {
//       $unwind:"$colecion"
//     },
//     {
//       $lookup:{
//         from:"conversacions",
//         localField:"colecion._id",
//         foreignField:"mensaje_id",
//         as:"salas"
//       }
//     },
//     {
//       $unwind:"$salas"
//     },
    // {
    //   $project:{
    //     _id:"$salas._id", title:"$salas.mensaje_id",curso:"$colecion.message"
    //   }
    // }
//   ]
// ).pretty()

// db.usuarios.aggregate(
//   [
//     {
//       $match:{
//         _id: ObjectId('6659ee05c1376e9c84dd8e5d')
//       }
//     },
//     {
//       $lookup:{
//         from:"conversacions",
//         localField:"_id",
//         foreignField:"usuario_id",
//         as:"salas"
//       }
    
//     },
//     {
//       $unwind:"$salas"
//     },
//     {
//       $lookup:{
//         from:"mensajeschemas",
//         localField:"salas.mensaje_id",
//         foreignField:"_id",
//         as:"colecion"
//       }
//     },
//     {
//       $unwind:"$colecion"
//     },
//     {
//       $project:{
//         _id:"$salas._id", title:"$salas.mensaje_id",curso:"$colecion.message", tutor:"$name"
//       }
//     }
//   ]
// ).pretty()

    // Consulta y población de datos

export default{

     usuarios: model("usuarios",usuarios),
    mensajes: model("mensajeSchema",mensajeSchema),
    conversacionSchema:model("conversacion",conversacionSchema)
}

