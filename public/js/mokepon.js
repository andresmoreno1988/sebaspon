//alert("hola mundo")
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionReiniciar = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById("btn-selec-mascota")
 

//let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
const spanMascotaJugador = document.getElementById("mascota-jugador")
const botonReiniciar = document.getElementById("btn-reiniciar")
const spanMascotaEnemigo = document.getElementById("mascota-enemigo")
const ataquesDelJugador = document.getElementById("ataque-jugador")
 const ataquesDelEnemigo = document.getElementById("ataque-enemigo")
//const spanAtaqueJugador = document.getElementById("ataque-jugador")


 


const sectionMensajes = document.getElementById("resultado")


const spanVidasEnemigo = document.getElementById("vidas-enemigo")
const spanVidasJugador = document.getElementById("vidas-jugador")
const contenedorTarjetas = document.getElementById("contenedor-de-tarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")
const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodoge 
let inputCapipepo 
let inputRatigueya
//let inputMewtwo 
let mascotaJugador
let ataquesMokepon
let ataquesMoqueponEnemigo
let indexAtaqueJugador
let indexAtaqueEnemigo
let btnFuego
let btnAgua
let btnTierra
let btnRayo
let btnAire
let botones = []
let definitiva
let victoriasJugador = 0
let victoriasEnemigo = 0
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./imagenes/mapajuego.png"
let avatarJugador
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth-20
const anchoMaximoDelMapa = 720
if(anchoDelMapa>anchoMaximoDelMapa) {
    
    anchoDelMapa=anchoMaximoDelMapa-20
}
alturaQueBuscamos = anchoDelMapa * 600 / 800
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos
console.log(anchoDelMapa, alturaQueBuscamos)

class Mokepon {
    constructor(nombre, foto, vida, id = null) {
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 80
        this.alto = 80
        this.x = aleatorio(0, mapa.width-this.ancho)
        this.y = aleatorio(0, mapa.height-this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let pikachu = new Mokepon("pikachu", "./imagenes/Pikachu.png", 5)
let bulbasaur = new Mokepon("bulbasaur", "./imagenes/bulbasaur.png", 5)
let zorro = new Mokepon("zorro", "./imagenes/zorro.png", 5)

/*let monstruoEnemigo = new Mokepon("monstruo", "./imagenes/monstruo.png", 5, 5, 265)
let miauEnemigo = new Mokepon("miau", "./imagenes/miau.png", 5, 595, 5)
let zariEnemigo = new Mokepon("zari", "./imagenes/zari.png", 5, 615, 285)
let mewtwoEnemigo = new Mokepon("mewtwo", "./imagenes/mewtwo.gif", 5, 290, 410)
console.log(hipodoge)*/
mokepones.push(pikachu, bulbasaur, zorro)
//mokeponesEnemigos.push(monstruoEnemigo,miauEnemigo,zariEnemigo,mewtwoEnemigo)

pikachu.ataques.push(
    { nombre: "rayo", id: "btn-rayo"},
    { nombre: "aire", id: "btn-aire"},
    { nombre: "agua", id: "btn-agua"},
    { nombre: "fuego", id: "btn-fuego"},
    { nombre: "tierra", id: "btn-tierra"}
)
bulbasaur.ataques.push(
    { nombre: "aire", id: "btn-aire"},
    { nombre: "tierra", id: "btn-tierra"},
    { nombre: "rayo", id: "btn-rayo"},
    { nombre: "fuego", id: "btn-fuego"},
    { nombre: "agua", id: "btn-agua"}
)
zorro.ataques.push(
    { nombre: "fuego", id: "btn-fuego"},
    { nombre: "rayo", id: "btn-rayo"},
    { nombre: "aire", id: "btn-aire"},
    { nombre: "agua", id: "btn-agua"},
    { nombre: "tierra", id: "btn-tierra"}
)
/*monstruoEnemigo.ataques.push(
    { nombre: "rayo", id: "btn-rayo"},
    { nombre: "agua", id: "btn-agua"},
    { nombre: "aire", id: "btn-aire"},
    { nombre: "fuego", id: "btn-fuego"},
    { nombre: "tierra", id: "btn-tierra"}
)
miauEnemigo.ataques.push(
    { nombre: "aire", id: "btn-aire"},
    { nombre: "tierra", id: "btn-tierra"},
    { nombre: "rayo", id: "btn-rayo"},
    { nombre: "fuego", id: "btn-fuego"},
    { nombre: "agua", id: "btn-agua"}
)
zariEnemigo.ataques.push(
    { nombre: "aire", id: "btn-aire"},
    { nombre: "rayo", id: "btn-rayo"},
    { nombre: "fuego", id: "btn-fuego"},
    { nombre: "agua", id: "btn-agua"},
    { nombre: "tierra", id: "btn-tierra"}
)
mewtwoEnemigo.ataques.push(
    { nombre: "aire", id: "btn-aire"},
    { nombre: "rayo", id: "btn-rayo"},
    { nombre: "fuego", id: "btn-fuego"},
    { nombre: "agua", id: "btn-agua"},
    { nombre: "tierra", id: "btn-tierra"}
)*/

function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = "none"
    sectionReiniciar.style.display = "none" 
    sectionVerMapa.style.display = "none"   

    mokepones.forEach((mokepon) => { //se inserta cada mokepon en html
        opcionDeMokepones = ` 
        <input type="radio" name="mascota" id=${mokepon.nombre} />
            <label class="tarjeta-de-mokepon" for="${mokepon.nombre}">
                <p>${mokepon.nombre}</p>
                <img src=${mokepon.foto} alt="${mokepon.nombre}">
            </label>
        `// se deben usar las comillas invertidas para poder insertar html desde javascript
    contenedorTarjetas.innerHTML += opcionDeMokepones // con el += se escriben todas las tarjetas del arreglo
    inputHipodoge = document.getElementById("pikachu")
    inputCapipepo = document.getElementById("bulbasaur")
    inputRatigueya = document.getElementById("zorro")
    //inputMewtwo = document.getElementById("mewtwo")
    })
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)    
        
    botonReiniciar.addEventListener("click", reiniciarJuego)
    uniserAlJuego()

}

function uniserAlJuego() {
    fetch("https://andresmoreno1988.github.io/sebaspon/public:8080/unirse")
        .then(function (res) {
            if(res.ok) {
                res.text()
                    .then(function(respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador() {
       
   if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = "<img src = " + pikachu.foto + " />"
        mascotaJugador = inputHipodoge.id
        avatarJugador = pikachu
   } else if (inputCapipepo.checked){
        spanMascotaJugador.innerHTML = "<img src = " + bulbasaur.foto + " />"
        mascotaJugador = inputCapipepo.id
        avatarJugador = bulbasaur
   } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = "<img src = " + zorro.foto + " />"
        mascotaJugador = inputRatigueya.id
        avatarJugador = zorro
   } else {
       alert("por favor seleccione una mascota")
       return
   }
    sectionSeleccionarAtaque.style.display = "none"    
    sectionSeleccionarMascota.style.display = "none" 
    seleccionarMokepon(mascotaJugador) 
    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = "flex"
    iniciarMapa()
    
}

function seleccionarMokepon(mascotaJugador) {
    fetch(`http://192.168.3.230:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
            
        })
    })

}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
       if (mascotaJugador === mokepones[i].nombre) {
           ataques = mokepones[i].ataques

       }
        
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques) {
    ataques.forEach((ataque) => {
        ataquesMokepon = `
        <button id = ${ataque.id} class="boton-ataque btn-ataque">${ataque.nombre}<img src="./imagenes/${ataque.nombre}.png" alt="${ataque.nombre}"></button>
        ` 
        contenedorAtaques.innerHTML += ataquesMokepon
        
    });
    btnFuego = document.getElementById("btn-fuego")
    btnAgua = document.getElementById("btn-agua")
    btnRayo = document.getElementById("btn-rayo")
    btnAire = document.getElementById("btn-aire")
    btnTierra = document.getElementById("btn-tierra") 
    botones = document.querySelectorAll(".btn-ataque")   
    /*btnFuego.addEventListener("click", ataqueFuego)
    btnAgua.addEventListener("click", ataqueAgua)
    btnTierra.addEventListener("click", ataqueTierra)*/
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click",(e) => {
            if (e.target.alt === "fuego" || e.target.innerText === "fuego" ) {
                ataqueJugador.push("FUEGO")
                console.log(ataqueJugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else if (e.target.alt === "tierra" || e.target.innerText === "tierra") {
                    ataqueJugador.push("TIERRA")
                    console.log(ataqueJugador)
                    boton.style.background = "#112f58"
                    boton.disabled = true
                } else if (e.target.alt === "agua" || e.target.innerText === "agua") {
                    ataqueJugador.push("AGUA")
                    console.log(ataqueJugador)
                    boton.style.background = "#112f58"
                    boton.disabled = true
                    } else if (e.target.alt === "rayo" || e.target.innerText === "rayo") {
                        ataqueJugador.push("RAYO")
                        console.log(ataqueJugador)
                        boton.style.background = "#112f58"
                        boton.disabled = true
                        } else if (e.target.alt === "aire" || e.target.innerText === "aire") {
                            ataqueJugador.push("AIRE")
                            console.log(ataqueJugador)
                            boton.style.background = "#112f58"
                            boton.disabled = true
                            }
            if (ataqueJugador.length === 5) {
                enviarAtaques()
            }
        })
    })
}

function enviarAtaques() {
    fetch(`http://192.168.3.230:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
            
        })
    })
    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    fetch(`http://192.168.3.230:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ ataques }){
                        if (ataques.length === 5) {
                            ataqueEnemigo = ataques
                            batalla()
                        }
                    })
            }
        })
}

function seleccionarMascotaEnemigo(enemigo){
    //let mascotaAleatorio = aleatorio(0, mokeponesEnemigos.length -1) 
    //spanMascotaEnemigo.innerHTML = "<img src = " + mokeponesEnemigos[mascotaAleatorio].foto + " />"
    spanMascotaEnemigo.innerHTML = "<img src = " + enemigo.foto + " />"
    ataquesMoqueponEnemigo = enemigo.ataques
    //secuenciaAtaque()
    /*if (mascotaAleatorio == 1) {
        spanMascotaEnemigo.innerHTML = "<img src =./imagenes/Pikachu.png />"
    } else if (mascotaAleatorio == 2) {
        spanMascotaEnemigo.innerHTML = "<img src =./imagenes/bulbasaur.png />"
    } else if (mascotaAleatorio == 3) {
        spanMascotaEnemigo.innerHTML = "<img src =./imagenes/zorro.png />"
    }   */     
}
function aleatorio(min,max){
    return Math.floor(Math.random()*(max - min + 1) + min)
}

/*function ataqueFuego(){
    
    ataqueJugador = "FUEGO"
    ataqueAleatorioEnemigo()
}
function ataqueAgua(){
    ataqueJugador = "AGUA"
    ataqueAleatorioEnemigo()
}
function ataqueTierra(){
    ataqueJugador = "TIERRA"
    ataqueAleatorioEnemigo()
}*/ //codigo antes de guardar los ataques en un arreglo

function ataqueAleatorioEnemigo(){
       
    ataqueAleatorio = aleatorio(0,ataquesMoqueponEnemigo.length -1)
    if (ataqueAleatorio == 0 || ataqueAleatorio == 1 ) {
        ataqueEnemigo.push("FUEGO")        
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push("AGUA")
    } else {
        ataqueEnemigo.push("TIERRA")
    }
    console.log(ataqueEnemigo)
    iniciarBatalla()
}

function iniciarBatalla() {
    if(ataqueJugador.length === 5) {
        batalla()
    }
}

function crearMensajes(resultado) {
        
    nuevoAtaqueJugador = document.createElement("p")
    nuevoAtaqueEnemigo = document.createElement("p")
    //parrafo.innerHTML = "Tu mascota atacó con " + ataqueJugador + ", la mascota del enemigo atacó con " + ataqueEnemigo + " - " + resultado + " 🎉"
    sectionMensajes.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = "TU ataque : " + indexAtaqueJugador
    nuevoAtaqueEnemigo.innerHTML = "Ataque PC : " + indexAtaqueEnemigo
    ataquesDelJugador.appendChild(nuevoAtaqueJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function crearMensajesFinal(resultadoFinal) {
    
    sectionReiniciar.style.display = "flex"     
    sectionMensajes.innerHTML = resultadoFinal    
    
}

function indexAmbosOponentes(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function batalla() {
    clearInterval(intervalo)

    for (let i = 0; i < ataqueJugador.length; i++) {
        if (ataqueJugador[i] == "AGUA" && ataqueEnemigo[i] == "FUEGO") {
            indexAmbosOponentes(i, i)
            crearMensajes("GANASTE")
            victoriasJugador++
           spanVidasJugador.innerHTML = "tienes : " + victoriasJugador + " victorias"
        } else if (ataqueJugador[i] == "TIERRA" && ataqueEnemigo[i] == "AGUA"){
            indexAmbosOponentes(i, i)    
            crearMensajes("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = "tienes : " + victoriasJugador + " victorias"
        } else if (ataqueJugador[i] == "FUEGO" && ataqueEnemigo[i] == "TIERRA"){
            indexAmbosOponentes(i, i)    
            crearMensajes("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = "tienes : " + victoriasJugador + " victorias"
        } else if (ataqueJugador[i] == "AIRE" && ataqueEnemigo[i] == "FUEGO"){
            indexAmbosOponentes(i, i)    
            crearMensajes("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = "tienes : " + victoriasJugador + " victorias"
        } else if (ataqueJugador[i] == "RAYO" && ataqueEnemigo[i] == "AGUA"){
            indexAmbosOponentes(i, i)    
            crearMensajes("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = "tienes : " + victoriasJugador + " victorias"
        } else if (ataqueJugador[i] == "AGUA" && ataqueEnemigo[i] == "AIRE"){
            indexAmbosOponentes(i, i)    
            crearMensajes("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = "tienes : " + victoriasJugador + " victorias"
        } else if (ataqueJugador[i] == "TIERRA" && ataqueEnemigo[i] == "RAYO"){
            indexAmbosOponentes(i, i)    
            crearMensajes("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = "tienes : " + victoriasJugador + " victorias"
        } else if (ataqueJugador[i] == "FUEGO" && ataqueEnemigo[i] == "RAYO"){
            indexAmbosOponentes(i, i)    
            crearMensajes("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = "tienes : " + victoriasJugador + " victorias"
        } else if (ataqueJugador[i] == "AIRE" && ataqueEnemigo[i] == "TIERRA"){
            indexAmbosOponentes(i, i)    
            crearMensajes("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = "tienes : " + victoriasJugador + " victorias"
        } else if (ataqueJugador[i] == "RAYO" && ataqueEnemigo[i] == "AIRE"){
            indexAmbosOponentes(i, i)    
            crearMensajes("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = "tienes : " + victoriasJugador + " victorias"
        } else if (ataqueJugador[i] == ataqueEnemigo[i]) {
            indexAmbosOponentes(i, i)    
            crearMensajes("EMPATASTE")
        } else {
            indexAmbosOponentes(i, i)
            crearMensajes("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = "tienes : " + victoriasEnemigo + " victorias"
        } 
    }
    revisarVictorias()
}

function revisarVictorias() {
    if (victoriasJugador > victoriasEnemigo) {
        crearMensajesFinal("Felicitaciones, has ganado la batalla")
    } else if (victoriasEnemigo > victoriasJugador) {
        crearMensajesFinal("Lo siento, perdiste la batalla, intentalo de nuevo")
    } else  {
        crearMensajesFinal("Empataste, intentalo de nuevo")
        }
}

function reiniciarJuego(){
    location.reload()
}

function pintarCanvas() {
    avatarJugador.x += avatarJugador.velocidadX
    avatarJugador.y += avatarJugador.velocidadY
    lienzo.clearRect(0,0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    avatarJugador.pintarMokepon()
    enviarPosicion(avatarJugador.x, avatarJugador.y)
    mokeponesEnemigos.forEach(function(mokepon){
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
    /*monstruoEnemigo.pintarMokepon()
    miauEnemigo.pintarMokepon()
    zariEnemigo.pintarMokepon()
    mewtwoEnemigo.pintarMokepon()
    if(avatarJugador.velocidadX !== 0 || avatarJugador.velocidadY !== 0) {
        
        revisarColision(mokeponEnemigo)
       // revisarColision(miauEnemigo)
       // revisarColision(zariEnemigo)
       // revisarColision(mewtwoEnemigo)
        
    }*/
}

function enviarPosicion(x, y) {
    fetch(`http://192.168.3.230:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y            
        })
    })
    .then(function(res) {
        if (res.ok) {
            res.json()
                .then(function({enemigos}) {
                    console.log(enemigos)
                    mokeponesEnemigos = enemigos.map(function (enemigo) {
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if (mokeponNombre === "pikachu") {
                            mokeponEnemigo = new Mokepon("pikachu", "./imagenes/Pikachu.png", 5, enemigo.id)                             
                        } else if (mokeponNombre === "bulbasaur") {
                            mokeponEnemigo = new Mokepon("bulbasaur", "./imagenes/bulbasaur.png", 5, enemigo.id)
                        } else if (mokeponNombre === "zorro") {
                            mokeponEnemigo = new Mokepon("zorro", "./imagenes/zorro.png", 5 , enemigo.id)
                        }
                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y
                        return mokeponEnemigo
                    })
                })
        }
    })
}
function moverArriba(){
    avatarJugador.velocidadY = -5
   
}
function moverDerecha(){
    avatarJugador.velocidadX = 5
   
}
function moverIzquierda(){
    avatarJugador.velocidadX = -5
   
}
function moverAbajo(){
    avatarJugador.velocidadY = 5
   
}
function parar(){
    avatarJugador.velocidadX = 0
    avatarJugador.velocidadY = 0
}

function sePresionoUnaTecla(event) {
   switch (event.key) {
       case "ArrowUp":
           moverArriba()
           break
        case "ArrowDown":
            moverAbajo()
            break
        case "ArrowLeft":
            moverIzquierda()
            break
        case "ArrowRight":
            moverDerecha()
            break
   
       default:
           break
   }
}

function iniciarMapa() {
    //mapa.width = 700
    //mapa.height = 500
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener("keydown", sePresionoUnaTecla)
    window.addEventListener("keyup", parar)
}

function revisarColision(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = avatarJugador.y
    const abajoMascota = avatarJugador.y + avatarJugador.alto
    const derechaMascota = avatarJugador.x + avatarJugador.ancho
    const izquierdaMascota = avatarJugador.x
    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }
    parar()
    clearInterval(intervalo)
    //alert("hay colision con " + enemigo.nombre)
    enemigoId = enemigo.id
    secuenciaAtaque(enemigo)
    sectionSeleccionarAtaque.style.display = "flex"
    sectionVerMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)
}


window.addEventListener("load", iniciarJuego)
