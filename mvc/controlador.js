class Controlador{
    
    constructor(modelo){
        this.modelo= modelo;

    }
    
    setStorage(){
        this.modelo.setStorage();
    }


        cambiarLimiteDeExtraccion(nuevoLimite) {
           let respuesta= this.modelo.cambiarLimiteDeExtraccion(nuevoLimite);
           return respuesta;
        }
        
        sumarDinero(cuenta, dineroAgregado){
            this.modelo.sumarDinero(cuenta, dineroAgregado);
        }
        
        depositarDinero(dineroAgregado) {
            let respuesta=this.modelo.depositarDinero(dineroAgregado);
            return respuesta;
        }
        
        restarDinero(cuenta, dineroRestado){
            this.modelo.restarDinero(cuenta, dineroRestado);
        }
        
        extraerDinero(dineroRestado) {
            let respuesta= this.modelo.extraerDinero(dineroRestado);
            return respuesta;
        }
        
        
        pagarServicio(servicioAPagar) {
            let respuesta= this.modelo.pagarServicio(servicioAPagar);
            return respuesta;
        }
        
        transferirDinero(monto, IDamigo) {        
            let respuesta=this.modelo.transferirDinero(monto, IDamigo);
            return respuesta;
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