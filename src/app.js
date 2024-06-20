import express from "express"
import cors from "cors"
import  path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import usuario from "./model/usuario.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
app.use(cors())

app.get("/usuarios",async(req, res)=>{
     const consulta = await usuario.usuarios.find()
     res.json(consulta)
})
app.get("/nombres/:nombre",async(req,res) => {
    const nombre = req.params.nombre
    const consulta = await usuario.usuarios.find()
    const filtrado = consulta.filter(user => user.nombre === nombre)
    if (filtrado.length === 0) {
        return res.status(404).send("No existe este usuario")
    }
    res.send(JSON.stringify(filtrado))

})
app.get('/lgeo', (req, res) => {
    res.render('/public/logeo.html'); // Renderizar la vista index.ejs
});

app.use(express.static(path.join(__dirname, "/public")))
app.use(express.static(path.join(__dirname, "/public/loge.html")))

export default app;

