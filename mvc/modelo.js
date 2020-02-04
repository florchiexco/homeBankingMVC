    
class Modelo{
    constructor(){
        //Datos
         this.cuenta;
         this.cuentas;
         this.amigos;
         this.servicios;
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
    
    
    
    }

export default Modelo;




