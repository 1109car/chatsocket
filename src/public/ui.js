
import { salasEnvio, SELEC, SELECT, userDos, userGET, UserMessage } from "./socket.js";
const socket= io()
let listado_data = document.querySelector("#listado_data");
let chat_rener = document.querySelector("#chat_rener");

const renderUI = (data) => {
  let div = document.createElement("div");
  div.classList.add("listados");
  div.innerHTML = `
             <ul class="ul">
                <li class="li" id="${data._id}" data-id="${data._id}">${data.nombre}</li>
            </ul>`;

  let li = div.querySelector(".li");
  // usuariologeado == data_id entonces eliminar ese un usuario de la vista del client
  li.addEventListener("click", (e) => {
   
    userDos(e.currentTarget.id);
    ChatRender();
    let divisiodos = document.createElement("div");
    divisiodos.classList.add("divisiodos");
    divisiodos.innerText = data.nombre;
    chat_rener.append(divisiodos);
   
  })
  return div;
};
export const renderizado = (data) => {

  listado_data.innerHTML = "";
  data.forEach((data) => {
    listado_data.append(renderUI(data));
    
  });
};

export const renderChat = (data) => {

  let div = document.createElement("div");
  div.classList.add("chat-render");
  div.innerHTML = `
            <form class="form_mesages">
                <input name="messages" class="messages" placeholder="escribe algo..."/>
                <button class="enviar">Enviar</button>
            </form>`;

  let messages = div.querySelector(".messages");
  let form_mesages = div.querySelector(".form_mesages");
  form_mesages.addEventListener("submit", (e) => {
    e.preventDefault();
    UserMessage(messages.value);
    salasEnvio();
  });
  return div;
};

export const ChatRender = (data) => {

  chat_rener.innerHTML = "";
  chat_rener.append(renderChat());
};
// noset()


const RenderMensaje = (render) => {

  let div = document.createElement("div");
  div.classList.add("tercerdiv");
  div.innerHTML = `
              <ul>
                <li>${render.message}</li>
              </ul>`;

  return div;
};

export const MensajesRender = (data) => {
    
  chat_rener.append(RenderMensaje(data))

};
