class Vista{
    constructor(controlador, modelo){
        this.controlador= controlador;
        this.modelo= modelo;
        this.init();
    }
    
    cargarNombreEnPantalla() {
        document.getElementById("nombre").innerHTML = "Bienvenido/a " + this.modelo.cuenta.nombreUsuario;
    }
    actualizarSaldoEnPantalla() {
        document.getElementById("saldo-cuenta").innerHTML = "$" + this.modelo.cuenta.saldoCuenta;
    }
    
    actualizarLimiteEnPantalla() {
        document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + this.modelo.cuenta.limiteExtraccion;
    }

    iniciarSesionVista(){
        let respuesta= Number(prompt("Ingrese su código de seguridad"));
        let funciono= this.controlador.iniciarSesion(respuesta);
        if(funciono){
            alert("Bienvenido/a");
        }
        else{
            alert("Ha introducido un código de seguridad incorrecto");
        }
    }

    
    init(){

        this.iniciarSesionVista();

        document.getElementById("extraerDinero").addEventListener("click", () => {
            let dineroRestado= Number(prompt("Ingrese el monto a extraer"));
            let funciono= this.controlador.extraerDinero(dineroRestado);
            if(funciono){
                alert("Dinero extraido correctamente");
                this.actualizarSaldoEnPantalla();
            }
            else{
                alert("El monto ingresado debe ser mayor al saldo de la cuenta, mayor al limite de extracción y múltiplo de 100.");
            }           
        });

        document.getElementById("depositarDinero").addEventListener("click", () => {
            let dineroAgregado= Number(prompt("Ingrese el monto a depositar"));
            let funciono= this.controlador.depositarDinero(dineroAgregado);
            if(funciono){
                alert("Dinero depositado correctamente");
                this.actualizarSaldoEnPantalla();
            }
            else{
                alert("El monto ingresado no es válido.");
            }           
        });

        document.getElementById("cambiarLimite").addEventListener("click", () => {
            let nuevoLimite= Number(prompt("Ingrese el nuevo límite"));
            this.controlador.cambiarLimiteDeExtraccion(nuevoLimite);
            alert("Limite cambiado correctamente");
            this.actualizarLimiteEnPantalla();
        });

        document.getElementById("pagarServicio").addEventListener("click", () => {
            let servicioAPagar= prompt("Ingrese el servicio a pagar");
            let funciono= this.controlador.pagarServicio(servicioAPagar);
            if(funciono){
                alert("Servicio pagado correctamente");
                this.actualizarSaldoEnPantalla();
            }
            else{
                alert("El servicio no pudo ser pagado.");
            }           
        });

        document.getElementById("transferirDinero").addEventListener("click", () => {
            let monto= Number(prompt("Ingrese el monto a transferir"));
            let IDamigo= Number(prompt("Ingrese el ID de la cuenta a transferir"));
            let funciono= this.controlador.transferirDinero(monto, IDamigo);
            if(funciono){
                alert("Dinero transferido correctamente");
                this.actualizarSaldoEnPantalla();
            }
            else{
                alert("El dinero no pudo ser transferido.");
            }           
        });

            this.cargarNombreEnPantalla();
            this.actualizarLimiteEnPantalla();
            this.actualizarSaldoEnPantalla();
        }

        
    
}

export default Vista; 