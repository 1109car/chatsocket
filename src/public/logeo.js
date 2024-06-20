

 export const nombre = document.querySelector("#nombre")
 const contrasena = document.querySelector("#contrasena")
 export const clickForm = document.querySelector("#clickForm")


    clickForm.addEventListener("click",async(e) => {
    //   e.preventDefault()
        const res =await fetch(`http://localhost:3000/nombres/${nombre.value}`)
        const req = await res.json(res)
        console.log(req)
        localStorage.setItem("persona-nombre",JSON.stringify(req))
        // setAttribute("href","")
      
    })
    
     
    
