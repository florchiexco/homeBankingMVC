import Modelo from "./modelo.js";
import Controlador from "./controlador.js"

const modelo = new Modelo();
console.log(modelo);
console.log(modelo.cuenta);
const controlador= new Controlador(modelo);
console.log(controlador);
controlador.cambiarLimiteDeExtraccion();
