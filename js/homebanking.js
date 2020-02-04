//1- JSON

async function readJSONcuentas(){
    try{
        var response= await fetch("data/cuentas.json");
        var data = await response.json();
        return data;
    }
    catch(error){
        throw(error);
    }
}

async function readJSONservicios(){
    try{
        var response= await fetch("data/servicios.json");
        var data = await response.json();
        return data;
    }
    catch(error){
        throw(error);
    }
}


//2- FUNCIONES DE STORAGE

function setStorage(){
localStorage.setItem("cuentas", JSON.stringify(cuentas));
localStorage.setItem("cuenta", JSON.stringify(cuentas[0]));
localStorage.setItem("amigos", JSON.stringify(cuentas.slice(1,3)));
localStorage.setItem("servicios", JSON.stringify(servicios));
}

//3- DECLARACIONES

var cuentas, cuenta, servicios, amigos;

//4- FUNCIONES DE ASIGNACIÓN PARA LA PRIMERA VEZ

function asignarCuentas(datos){
cuentas=datos;
console.log(cuentas);
}

function asignarServicios(datos){
servicios=datos;
console.log(servicios);
}

var asignarCuenta= function(){
cuenta= cuentas[0];
console.log(cuenta);
}


var asignarAmigos= function(){
amigos= cuentas.slice(1,3);
console.log(amigos);
}

//Esta funcion solo se va a ejecutar si el localstorage no tiene datos 

if(localStorage.getItem("cuentas") == null){
readJSONcuentas().then(asignarCuentas);
}
else{
cuentas= JSON.parse(localStorage.getItem("cuentas"));
}

if(localStorage.getItem("cuenta")== null){
readJSONcuentas().then(asignarCuenta);
}
else{
cuenta= JSON.parse(localStorage.getItem("cuenta"));
}

if(localStorage.getItem("amigos")== null){
readJSONcuentas().then(asignarAmigos);
}
else{
amigos= JSON.parse(localStorage.getItem("amigos"));
}

if(localStorage.getItem("servicios")== null){
readJSONservicios().then(asignarServicios);
}
else{
servicios= JSON.parse(localStorage.getItem("servicios"));    
}

//5- FUNCIONALIDAD DEL HOMEBANKING

// //Ejecución de las funciones que actualizan los valores de las variables en el HTML.

readJSONcuentas().then(function() {
cargarNombreEnPantalla();
actualizarSaldoEnPantalla();
actualizarLimiteEnPantalla();
})

// //Ejecucion de otras funciones

readJSONcuentas().then(iniciarSesion);


// //Funciones
function cambiarLimiteDeExtraccion() {
var nuevoLimite;
nuevoLimite= prompt("Ingrese el nuevo limite");
cuenta.limiteExtraccion= Number(nuevoLimite); 
actualizarLimiteEnPantalla();  
setStorage(); 
}

function sumarDinero(cuenta, dineroAgregado){
cuenta.saldoCuenta = cuenta.saldoCuenta+ Number(dineroAgregado);
}

function depositarDinero() {
var dineroAgregado=prompt("Ingrese la cantidad de dinero a depositar");
if(dineroAgregado>0){
    sumarDinero(cuenta, dineroAgregado);
}
else{
    alert("El valor ingresado no es valido");
}
actualizarSaldoEnPantalla();
setStorage();
}

function restarDinero(cuenta, dineroRestado){
cuenta.saldoCuenta= cuenta.saldoCuenta-Number(dineroRestado);
}

function extraerDinero() {
var dineroRestado= Number(prompt("Ingrese la cantidad de dinero a extraer"));
if(dineroRestado > cuenta.saldoCuenta || dineroRestado > cuenta.limiteExtraccion){
    alert("La operacion no es válida, el monto ingresado debe ser mayor al saldo actual y menor al limite de extracción.");
}
else{
    if(dineroRestado % 100 == 0){
        restarDinero(cuenta, dineroRestado);
        actualizarSaldoEnPantalla();
    }
    else{
        alert("El dinero a extraer debe ser multiplo de 100");
    }
}
setStorage();
}


function pagarServicio() {
var respuesta= prompt("Ingrese el servicio a pagar");
if(respuesta==="luz" || respuesta==="agua" || respuesta==="gas"){

    switch(respuesta){

        case "luz":
            if(cuenta.saldoCuenta > servicios[0].monto && !servicios[0].fuePagado){
                cuenta.saldoCuenta=cuenta.saldoCuenta-150;
                servicios[0].fuePagado=true;
                alert("Luz pagada correctamente");
            }
            else{
                alert("Usted no posee monto suficiente para pagar la luz o ya la ha pagado anteriormente.");
            }
            break;

        case "agua":
            if(cuenta.saldoCuenta > servicios[1].monto && !servicios[1].fuePagado){
                cuenta.saldoCuenta=cuenta.saldoCuenta-50;
                servicios[1].fuePagado=true;
                alert("Agua pagada correctamente");
            }
            else{
                alert("Usted no posee monto suficiente para pagar el agua o ya ha pagado anteriormente.");
            }
            break;

        case "gas":
            if(cuenta.saldoCuenta > servicios[2].monto && !servicios[2].fuePagado){
                cuenta.saldoCuenta=cuenta.saldoCuenta-25;
                servicios[2].fuePagado=true;
                alert("Gas pagado correctamente")
            }
            else{
                alert("Usted no posee monto suficiente para pagar el gas o ya ha pagado anteriormente.");
            }
            break;
    }
}
else{
    alert("El servicio ingresado no es valido")
}
actualizarSaldoEnPantalla();
setStorage();
}

function transferirDinero() {
var monto= prompt("Ingrese monto a transferir");

if(monto>cuenta.saldoCuenta){
    alert("No tiene saldo suficiente para realizar esta transferencia.");
}

else {

var IDamigo= Number(prompt("Ingrese el ID del usuario a transferir"));

for(i=0; i<amigos.length; i++){

    if(IDamigo==amigos[i].ID){
        sumarDinero(amigos[i], monto);
        restarDinero(cuenta, monto);
        alert("Dinero transferido correctamente");
        actualizarSaldoEnPantalla();
        console.log(amigos[i].saldoCuenta);
        break;
    }

    else{
        alert("El ID no corresponde a ninguna cuenta amiga.");
        break;
    }
}
}
setStorage();
}

function iniciarSesion() {
var respuesta= Number(prompt("Ingrese su codigo de seguridad"));
if(respuesta===cuenta.codigoSeguridad){
    alert("Bienvenido/a");
}
else{
    alert("Ha introducido un código incorrecto");
    cuenta.saldoCuenta=0;
    actualizarSaldoEnPantalla();
}
setStorage();
}

// //Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
document.getElementById("nombre").innerHTML = "Bienvenido/a " + cuenta.nombreUsuario;
}

function actualizarSaldoEnPantalla() {
document.getElementById("saldo-cuenta").innerHTML = "$" + cuenta.saldoCuenta;
}

function actualizarLimiteEnPantalla() {
document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + cuenta.limiteExtraccion;
}