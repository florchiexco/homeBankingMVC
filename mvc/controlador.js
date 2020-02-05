class Controlador{

    constructor(modelo){
        this.modelo= modelo;
    }

    setStorage(){
        localStorage.setItem("cuentas", JSON.stringify(this.modelo.cuentas));
        localStorage.setItem("cuenta", JSON.stringify(this.modelo.cuentas[0]));
        localStorage.setItem("amigos", JSON.stringify(this.modelo.cuentas.slice(1,3)));
        localStorage.setItem("servicios", JSON.stringify(this.modelo.servicios));
    }

        cambiarLimiteDeExtraccion(nuevoLimite) {
            this.modelo.cuenta.limiteExtraccion= Number(nuevoLimite);  
            this.setStorage();
        }
        
        sumarDinero(cuenta, dineroAgregado){
            cuenta.saldoCuenta = cuenta.saldoCuenta+ Number(dineroAgregado);
        }
        
        depositarDinero(dineroAgregado) {
            if(dineroAgregado>0){
                this.sumarDinero(this.modelo.cuenta, dineroAgregado);
                console.log("El dinero fue depositado correctamente");
                this.setStorage();
                return true;
                
            }
            else{
                console.log("El valor ingresado no es valido");
                this.setStorage();
                return false;
            }
         }
        
        restarDinero(cuenta, dineroRestado){
            cuenta.saldoCuenta= cuenta.saldoCuenta-Number(dineroRestado);
        }
        
        extraerDinero(dineroRestado) {
        if(dineroRestado > this.modelo.cuenta.saldoCuenta || dineroRestado > this.modelo.cuenta.limiteExtraccion){
           console.log("La operacion no es válida, el monto ingresado debe ser mayor al saldo actual y menor al limite de extracción.");
           this.setStorage();
           return false;
        }
        else{
            if(dineroRestado % 100 == 0){
                this.restarDinero(this.modelo.cuenta, dineroRestado);
                console.log("Dinero extraído correctamente");
                this.setStorage();
                return true;
            }
            else{
                console.log("El dinero a extraer debe ser multiplo de 100");
                this.setStorage();
                return false;
            }
        }
        }
        
        
        pagarServicio(servicioAPagar) {
        if(servicioAPagar==="luz" || servicioAPagar==="agua" || servicioAPagar==="gas"){
        
            switch(servicioAPagar){
        
                case "luz":
                    if(this.modelo.cuenta.saldoCuenta > this.modelo.servicios[0].monto && !this.modelo.servicios[0].fuePagado){
                        this.modelo.cuenta.saldoCuenta=this.modelo.cuenta.saldoCuenta-150;
                        this.modelo.servicios[0].fuePagado=true;
                        console.log("Luz pagada correctamente");
                        this.setStorage();
                        return true;
                    }
                    else{
                        console.log("No posee monto suficiente para pagar la luz o ya la ha pagado anteriormente.");
                        return false;
                    }
                    break;
        
                case "agua":
                    if(this.modelo.cuenta.saldoCuenta > this.modelo.servicios[1].monto && !this.modelo.servicios[1].fuePagado){
                        this.modelo.cuenta.saldoCuenta=this.modelo.cuenta.saldoCuenta-50;
                        this.modelo.servicios[1].fuePagado=true;
                        console.log("Agua pagada correctamente");
                        this.setStorage();
                        return true;
                    }
                    else{
                        console.log("Usted no posee monto suficiente para pagar el agua o ya ha pagado anteriormente.");
                        return false;
                    }
                    break;
        
                case "gas":
                    if(this.modelo.cuenta.saldoCuenta > this.modelo.servicios[2].monto && !this.modelo.servicios[2].fuePagado){
                        this.modelo.cuenta.saldoCuenta=this.modelo.cuenta.saldoCuenta-25;
                        this.modelo.servicios[2].fuePagado=true;
                        console.log("Gas pagado correctamente");
                        this.setStorage();
                        return true;
                    }
                    else{
                        console.log("Usted no posee monto suficiente para pagar el gas o ya ha pagado anteriormente.");
                        return false;
                    }
                    break;
            }
        }
        else{
            console.log("El servicio ingresado no es valido");
            return false;
        }
        }
        
        transferirDinero(monto, IDamigo) {        
        if(monto>this.modelo.cuenta.saldoCuenta){
            console.log("No tiene saldo suficiente para realizar esta transferencia.");
            return false;
        }
        
        else {
        
        for(i=0; i<this.modelo.amigos.length; i++){
        
            if(IDamigo==this.modelo.amigos[i].ID){
                sumarDinero(this.modelo.amigos[i], monto);
                restarDinero(this.modelo.cuenta, monto);
                console.log("Dinero transferido correctamente");
                console.log("Nuevo saldo del ID amigo: " + this.modelo.amigos[i].saldoCuenta);
                this.setStorage();
                return true;
                break;
            }
        
            else{
                console.log("El ID no corresponde a ninguna cuenta amiga.");
                return false;
                break;
            }
        }
        }
        }
        
       iniciarSesion(respuesta) {
        if(respuesta===this.modelo.cuenta.codigoSeguridad){
            console.log("Código de seguridad correcto");
            return true;
        }
        else{
            console.log("Ha introducido un código incorrecto");
            this.modelo.cuenta.saldoCuenta=0;
            this.setStorage();
            return false;
        }
        }

        

}

export default Controlador;