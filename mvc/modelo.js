    
class Modelo{
    constructor(){
        //Datos
         this.cuenta= {};
         this.cuentas= [];
         this.amigos= [];
         this.servicios= [];
         this.observadores= [];
         this.init();
    }
    //Metodos
    init(){
        console.log("INIT");
        if(localStorage.getItem("cuentas") == null){
            readJSONcuentas().then(asignarCuentas);
            }
            else{
            this.cuentas= JSON.parse(localStorage.getItem("cuentas"));
            }
            
            if(localStorage.getItem("cuenta")== null){
            readJSONcuentas().then(asignarCuenta);
            }
            else{
            this.cuenta= JSON.parse(localStorage.getItem("cuenta"));
            }
            
            if(localStorage.getItem("amigos")== null){
            readJSONcuentas().then(asignarAmigos);
            }
            else{
                this.amigos= JSON.parse(localStorage.getItem("amigos"));
            }
            
            if(localStorage.getItem("servicios")== null){
            readJSONservicios().then(asignarServicios);
            }
            else{
                this.servicios= JSON.parse(localStorage.getItem("servicios"));    
            }
    }

    async readJSONcuentas(){
        try{
            var response= await fetch("data/cuentas.json");
            var data = await response.json();
            return data;
        }
        catch(error){
            throw(error);
        }
    }
    async readJSONservicios(){
        try{
            var response= await fetch("data/servicios.json");
            var data = await response.json();
            return data;
        }
        catch(error){
            throw(error);
         }
     }
        
     asignarCuentas(datos){
        this.cuentas=datos;
        console.log(this.cuentas);
     }
    
    asignarServicios(datos){
        this.servicios=datos;
        console.log(this.servicios);
     }
        
    asignarCuenta= function(){
        this.cuenta= this.cuentas[0];
        console.log(this.cuenta);
    }
        
    asignarAmigos= function(){
        this.amigos= this.cuentas.slice(1,3);
        console.log(this.amigos);
    }

    setStorage(){
        localStorage.setItem("cuentas", JSON.stringify(this.cuentas));
        localStorage.setItem("cuenta", JSON.stringify(this.cuentas[0]));
        localStorage.setItem("amigos", JSON.stringify(this.cuentas.slice(1,3)));
        localStorage.setItem("servicios", JSON.stringify(this.servicios));
    }


    cambiarLimiteDeExtraccion(nuevoLimite) {
        this.cuenta.limiteExtraccion= Number(nuevoLimite);
        this.notificar(); //Aca me tira que this es undefined
        this.setStorage();
    }
        
    sumarDinero(cuenta, dineroAgregado){
        cuenta.saldoCuenta = cuenta.saldoCuenta+ Number(dineroAgregado);
    }
        
    depositarDinero(dineroAgregado) {
        if(dineroAgregado>0){
            this.sumarDinero(this.cuenta, dineroAgregado);
            console.log("El dinero fue depositado correctamente");
            this.notificar();
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
        if(dineroRestado > this.cuenta.saldoCuenta || dineroRestado > this.cuenta.limiteExtraccion){
           console.log("La operacion no es válida, el monto ingresado debe ser mayor al saldo actual y menor al limite de extracción.");
           this.setStorage();
           return false;
        }
        else{
            if(dineroRestado % 100 == 0){
                this.restarDinero(this.cuenta, dineroRestado);
                console.log("Dinero extraído correctamente");
                this.notificar();
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
                    if(this.cuenta.saldoCuenta > this.servicios[0].monto && !this.servicios[0].fuePagado){
                        
                        this.cuenta.saldoCuenta=this.cuenta.saldoCuenta-150;
                        this.servicios[0].fuePagado=true;
                        console.log("Luz pagada correctamente");
                        this.notificar();
                        this.setStorage();
                        return true;

                    }

                    else{
                       
                        console.log("No posee monto suficiente para pagar la luz o ya la ha pagado anteriormente.");
                        return false;

                    }

                    break;
        
                case "agua":
                    if(this.cuenta.saldoCuenta > this.servicios[1].monto && !this.servicios[1].fuePagado){
                        
                        this.cuenta.saldoCuenta=this.cuenta.saldoCuenta-50;
                        this.servicios[1].fuePagado=true;
                        console.log("Agua pagada correctamente");
                        this.notificar();
                        this.setStorage();
                        return true;

                    }
                    else{

                        console.log("Usted no posee monto suficiente para pagar el agua o ya ha pagado anteriormente.");
                        return false;

                    }

                    break;
        
                case "gas":
                    if(this.cuenta.saldoCuenta > this.servicios[2].monto && !this.servicios[2].fuePagado){
                        
                        this.cuenta.saldoCuenta=this.cuenta.saldoCuenta-25;
                        this.servicios[2].fuePagado=true;
                        console.log("Gas pagado correctamente");
                        this.notificar();
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

        if(monto>this.cuenta.saldoCuenta){
            console.log("No tiene saldo suficiente para realizar esta transferencia.");
            return false;
        }
        
        else {
        
            for(var i=0; i<this.amigos.length; i++){
            
                if(IDamigo==this.amigos[i].ID){
                    this.sumarDinero(this.amigos[i], monto);
                    this.restarDinero(this.cuenta, monto);
                    console.log("Dinero transferido correctamente");
                    console.log("Nuevo saldo del ID amigo: " + this.amigos[i].saldoCuenta);
                    this.notificar();
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
    

    suscribirse(callback){
        this.observadores.push(callback);
    }    
                           
   notificar(){
       this.observadores.forEach(observador => observador(this.cuenta));
   }
}

export default Modelo;