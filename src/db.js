import { connect } from "mongoose";
import {BASEDEDATOSMONGO} from "./config.js"

export const connectDB = async() =>{
    try {
        await connect(BASEDEDATOSMONGO)
        console.log("conectado a mongo db")
    } catch (error) {
        console.log(error)
    }
}
