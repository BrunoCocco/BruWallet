// login 

const iniciarSesion = () =>{
    let usuario = document.getElementById("ingresar").value
    console.log(usuario)
    document.getElementById("header").innerHTML = `
    <div class="row mt-3">
        <h3 class=" header__h3--bienvenidos col-11 pt-1">Bienvenidos a UalaTru <spam class="spam__Dato"> ${usuario}</spam> </h3>
        <button class="btn-close col-1 pt-2" onclick="cerrarSesion()"></button>
    </div>
    `
    localStorage.setItem("NewUser", usuario)
}

// close
const cerrarSesion = () =>{
    let usuario = document.getElementById("ingresar").value
    document.getElementById("header").innerHTML = `
    <div class="row mt-3">
        <h3 class="header__h3--bienvenidos col-9 pt-1">Bienvenidos a UalaTru</h3>
        <button class="btn btn-primary col-3" data-bs-toggle="modal"  data-bs-target="#ingreso">ingresar</button>
    </div>
    `
    console.log(usuario)
}


// Funcion init, chequea local y baja info 

const init = () => {
    let usuario = localStorage.getItem("NewUser");
    
    if(localStorage.getItem("ingresoKEY") == null){
        localStorage.setItem("ingresoKEY", 0)
    $("#saldoActual").append ( `<div> 
    <h2>$ ${localStorage.getItem("ingresoKEY")} </h2>
        </div>`)
        console.log(localStorage)
    }
    else{
        $("#saldoActual").append ( `<div> 
    <h2 style="color: blue;">$ ${localStorage.getItem("ingresoKEY")} </h2>
        </div>`)
    }
    if(usuario == null){
        document.getElementById("header").innerHTML = `
    <div class="row mt-3">
        <h3 class="header__h3--bienvenidos col-9 pt-1">Bienvenidos a UalaTru</h3>
        <button class="btn btn-primary col-3" data-bs-toggle="modal"  data-bs-target="#ingreso">ingresar</button>
    </div>
    `
    }
    else{
        document.getElementById("header").innerHTML = `
    <div class="row mt-3">
        <h3 class=" header__h3--bienvenidos col-11 pt-1">Bienvenidos a UalaTru <spam class="spam__Dato"> ${usuario}</spam> </h3>
        <button class="btn-close col-1 pt-2" onclick="cerrarSesion()"></button>
    </div>
    `
    }
}
init()


// deposito. 


class deposito{
    constructor(monto,fecha){
        this.monto = monto,
        this.fecha = fecha
    }
}

let acumuladorDepositos = [];

// Nuevo deposito

const depositar = (monto,fecha) => {
    new deposito(monto,fecha)
    
    this.monto = parseInt(document.getElementById("depositar").value)
    this.fecha = Date()

    let datostorage = JSON.parse(localStorage.getItem("ingresoKEY", Number))

    if(this.monto > 0 && this.monto <= 10000 ){
        
    nuevoNumero = datostorage + this.monto
    console.log(nuevoNumero)
    
    document.getElementById("saldoActual").innerHTML = `<div> 
        <h2 style="color:blue;">$ ${nuevoNumero}</h2>
        </div>`
    
    localStorage.setItem("ingresoKEY", nuevoNumero)
    
    acumuladorDepositos.push(this.monto)
    
    $("#print").append (`
    <div class="row mt-3">
        <div class="col-12">
            <div class="print--deposito"> Depositaste $${this.monto}</div>
            <div>
                <p class="print--date"> ${this.fecha}</p
            </div>
        </div>
    </div>`)
    
    Swal.fire(
        'DEPOSITO APROBADO!',
        `monto ingresado: $${this.monto}`,
        'success'
    )
    }
    else{
        console.log("deposito incorrecto")
        Swal.fire('monto ingresado incorrecto')
    }
}


//TODO: funcion Retirar Dinero
class Retiros {
    constructor (retiro,fecha){
        this.retiro = retiro,
        this.fecha = fecha
    }
}

let difRetiros = [];

const retirar = (retiro,fecha) => {
new Retiros(retiro,fecha)

this.retiro = parseInt(document.getElementById("retiro").value)
this.fecha = Date()

let monto = localStorage.getItem("ingresoKEY", Number)

if(monto > 0 && this.retiro <= monto ){
    nuevoNumero = monto - this.retiro
    
    document.getElementById("saldoActual").innerHTML = `<div> 
        <h2 style="color:blue;">$ ${nuevoNumero}</h2>
        </div>`
    
        localStorage.setItem("ingresoKEY", nuevoNumero)
    
    $("#print").append (`
    <div class="row mt-3">   
        <div class="col-12">
            <div class="print--retiro"> retiraste $${this.retiro}</div>
            <div>
                <p class="print--date"> ${this.fecha} </p
            </div>
        </div>
    </div>`)

    difRetiros.push(this.retiro)
    console.log(difRetiros)
    Swal.fire(
        'Retiro APROBADO!',
        `monto retirado: $${this.retiro}`,
        'success'
    )
}
else{
        console.log("operacion de retiro invalida")
        Swal.fire('Monto Invalido')
    }
}


// borrar historial
const historial = () =>{
    $("#print").fadeOut()
    console.log("oculto")
}
// mostrar historial
const historialmuestra = () =>{
    $("#print").fadeIn()
    console.log("visible")
}