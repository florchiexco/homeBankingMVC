import Modelo from "./modelo.js";
import Controlador from "./controlador.js"
import Vista from "./vista.js"

const modelo = new Modelo();
const vista= new Vista(modelo);
const controlador= new Controlador(modelo, vista);

