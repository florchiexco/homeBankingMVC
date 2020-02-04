//En modelo se supone que se trajeron los datos de JSON y se asignaron a las variables

class Controlador{

    constructor(modelo){
        this.modelo= modelo;
    }

    setStorage(){
        localStorage.setItem("cuentas", JSON.stringify(modelo.cuentas));
        localStorage.setItem("cuenta", JSON.stringify(modelo.cuentas[0]));
        localStorage.setItem("amigos", JSON.stringify(modelo.cuentas.slice(1,3)));
        localStorage.setItem("servicios", JSON.stringify(modelo.servicios));
    }

    cambiarLimiteDeExtraccion() {
        var nuevoLimite;
        nuevoLimite= prompt("Ingrese el nuevo limite");
        modelo.cuenta.limiteExtraccion= Number(nuevoLimite); 
        actualizarLimiteEnPantalla();  
        setStorage(); 
        }
        
        sumarDinero(cuenta, dineroAgregado){
        cuenta.saldoCuenta = modelo.cuenta.saldoCuenta+ Number(dineroAgregado);
        }
        
        depositarDinero() {
        var dineroAgregado=prompt("Ingrese la cantidad de dinero a depositar");
        if(dineroAgregado>0){
            sumarDinero(modelo.cuenta, dineroAgregado);
        }
        else{
            alert("El valor ingresado no es valido");
        }
        actualizarSaldoEnPantalla();
        setStorage();
        }
        
        restarDinero(cuenta, dineroRestado){
        cuenta.saldoCuenta= cuenta.saldoCuenta-Number(dineroRestado);
        }
        
        extraerDinero() {
        var dineroRestado= Number(prompt("Ingrese la cantidad de dinero a extraer"));
        if(dineroRestado > modelo.cuenta.saldoCuenta || dineroRestado > modelo.cuenta.limiteExtraccion){
            alert("La operacion no es válida, el monto ingresado debe ser mayor al saldo actual y menor al limite de extracción.");
        }
        else{
            if(dineroRestado % 100 == 0){
                restarDinero(modelo.cuenta, dineroRestado);
                actualizarSaldoEnPantalla();
            }
            else{
                alert("El dinero a extraer debe ser multiplo de 100");
            }
        }
        setStorage();
        }
        
        
        pagarServicio() {
        var respuesta= prompt("Ingrese el servicio a pagar");
        if(respuesta==="luz" || respuesta==="agua" || respuesta==="gas"){
        
            switch(respuesta){
        
                case "luz":
                    if(modelo.cuenta.saldoCuenta > servicios[0].monto && !servicios[0].fuePagado){
                        modelo.cuenta.saldoCuenta=modelo.cuenta.saldoCuenta-150;
                        servicios[0].fuePagado=true;
                        alert("Luz pagada correctamente");
                    }
                    else{
                        alert("Usted no posee monto suficiente para pagar la luz o ya la ha pagado anteriormente.");
                    }
                    break;
        
                case "agua":
                    if(modelo.cuenta.saldoCuenta > servicios[1].monto && !servicios[1].fuePagado){
                        modelo.cuenta.saldoCuenta=modelo.cuenta.saldoCuenta-50;
                        servicios[1].fuePagado=true;
                        alert("Agua pagada correctamente");
                    }
                    else{
                        alert("Usted no posee monto suficiente para pagar el agua o ya ha pagado anteriormente.");
                    }
                    break;
        
                case "gas":
                    if(modelo.cuenta.saldoCuenta > servicios[2].monto && !servicios[2].fuePagado){
                        modelo.cuenta.saldoCuenta=modelo.cuenta.saldoCuenta-25;
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
        
        transferirDinero() {
        var monto= prompt("Ingrese monto a transferir");
        
        if(monto>modelo.cuenta.saldoCuenta){
            alert("No tiene saldo suficiente para realizar esta transferencia.");
        }
        
        else {
        
        var IDamigo= Number(prompt("Ingrese el ID del usuario a transferir"));
        
        for(i=0; i<modelo.amigos.length; i++){
        
            if(IDamigo==modelo.amigos[i].ID){
                sumarDinero(modelo.amigos[i], monto);
                restarDinero(modelo.cuenta, monto);
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
        
       iniciarSesion() {
        var respuesta= Number(prompt("Ingrese su codigo de seguridad"));
        if(respuesta===modelo.cuenta.codigoSeguridad){
            alert("Bienvenido/a");
        }
        else{
            alert("Ha introducido un código incorrecto");
            modelo.cuenta.saldoCuenta=0;
            actualizarSaldoEnPantalla();
        }
        setStorage();
        }

}

export default Controlador;