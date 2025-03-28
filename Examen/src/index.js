const path = require("path")
const readline = require("readline")
const fs = require('fs');
const yargs = require('yargs');
const argv = yargs.option('archivo', {
    alias: 'f',
    description: 'Datos productos',
    type: 'string',
    demandOption: true
}).argv;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const solicitarDatos = (el) => {
    return new Promise((resolve) => {
        rl.question(el, (respuesta) => resolve(respuesta));
    });
};


const obtenerDatos = async () => {
    try {
        const producto = await solicitarDatos("Ingrese el nombre del producto: ");
        const precio = parseInt(await solicitarDatos("Ingrese el precio del producto: "+"$"), 10);
        const cantidad = parseInt(await solicitarDatos("Ingrese la cantidad de productos: "), 10);
        const nuevoProducto = {
            nombre: producto,
            precio: precio,
            cantidad: cantidad
        };
        const archivo = argv.archivo;
        if (fs.existsSync(archivo)) {
            const datos = JSON.parse(fs.readFileSync(archivo, "utf-8"));
            datos.push(nuevoProducto);
            fs.writeFileSync(archivo, JSON.stringify(datos, null, 2));
            console.log("[Producto agregado]");
        } else {
            fs.writeFileSync(archivo, JSON.stringify([nuevoProducto], null, 2));
            console.log("[Datos agregados correctamente]");
        }
        const datosLeidos = JSON.parse(fs.readFileSync(archivo, "utf-8"));
        console.log("[Datos actuales del archivo]:");
        console.log(datosLeidos);
    } catch (error) {
        console.log("Ha ocurrido un error", error);
    } finally {
        rl.close();
    }
};

obtenerDatos();


