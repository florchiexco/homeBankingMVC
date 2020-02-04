class Vista{
    constructor(modelo){
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


    
    init(){
            this.cargarNombreEnPantalla();
            this.actualizarLimiteEnPantalla();
            this.actualizarSaldoEnPantalla();
        }
    
}

export default Vista; 