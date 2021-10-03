// clase constructora de objetos

class Dinero {
    constructor(concepto, monto) {
        this.concepto = concepto.toUpperCase();
        this.monto = parseInt(monto);
    }
}

// Arrays agrupando objetos de ingreso/gasto
const misIngresos = [];
const misGastos = [];

let banderaIngresos = 0;
let banderaGastos = 0;


// ------------------------- CARGA INGRESOS Y GASTOS -------------------------

let resumenIngresos = document.getElementById("botonIngresos")
resumenIngresos.onclick = () => {
    
    if (banderaIngresos == 0) {
        let ing1 = document.getElementById("ingreso1").value;
        let ing2 = document.getElementById("ingreso2").value;
        let ing3 = document.getElementById("ingreso3").value;
        let ing4 = document.getElementById("ingreso4").value;
        let ing5 = document.getElementById("ingreso5").value;
        
        let mtI1 = document.getElementById("ingresoMonto1").value;
        let mtI2 = document.getElementById("ingresoMonto2").value;
        let mtI3 = document.getElementById("ingresoMonto3").value;
        let mtI4 = document.getElementById("ingresoMonto4").value;
        let mtI5 = document.getElementById("ingresoMonto5").value;
        
        //cargo al array de ingresos
        misIngresos.push(new Dinero(ing1, mtI1));
        misIngresos.push(new Dinero(ing2, mtI2));
        misIngresos.push(new Dinero(ing3, mtI3));
        misIngresos.push(new Dinero(ing4, mtI4));
        misIngresos.push(new Dinero(ing5, mtI5));
        
        
        let padre1 = document.getElementById("mostrarIngresos");
        
        for (const ingreso of misIngresos) {
            if ((ingreso.concepto != "") && (ingreso.monto != NaN) && (ingreso.monto > 0)) {
                let li = document.createElement("li");
                li.innerHTML = `Concepto: <b>${ingreso.concepto}</b>
                ------ <b>$${ingreso.monto}</b>`;
                padre1.appendChild(li);
            } else {
                let li = document.createElement("li");
                li.innerHTML = `Concepto sin ingresar, o monto inválido`;
                padre1.appendChild(li);
            }
        }
        banderaIngresos = 1;
    }
}


let resumenGastos = document.getElementById("botonGastos")
resumenGastos.onclick = () => {
    
    if (banderaGastos == 0) {
        let gst1 = document.getElementById("gasto1").value;
        let gst2 = document.getElementById("gasto2").value;
        let gst3 = document.getElementById("gasto3").value;
        let gst4 = document.getElementById("gasto4").value;
        let gst5 = document.getElementById("gasto5").value;
        
        let mtG1 = document.getElementById("gastoMonto1").value;
        let mtG2 = document.getElementById("gastoMonto2").value;
        let mtG3 = document.getElementById("gastoMonto3").value;
        let mtG4 = document.getElementById("gastoMonto4").value;
        let mtG5 = document.getElementById("gastoMonto5").value;
        
        //cargo al array de gastos
        misGastos.push(new Dinero(gst1, mtG1));
        misGastos.push(new Dinero(gst2, mtG2));
        misGastos.push(new Dinero(gst3, mtG3));
        misGastos.push(new Dinero(gst4, mtG4));
        misGastos.push(new Dinero(gst5, mtG5));
        
        
        let padre2 = document.getElementById("mostrarGastos");
        
        for (const egreso of misGastos) {
            if ((egreso.concepto != "") && (egreso.monto != NaN) && (egreso.monto > 0)) {
                let li = document.createElement("li");
                li.innerHTML = `Concepto: <b>${egreso.concepto}</b>
                ------ <b>$${egreso.monto}</b>`;
                padre2.appendChild(li);
            } else {
                let li = document.createElement("li");
                li.innerHTML = `Concepto sin ingresar, o monto inválido`;
                padre2.appendChild(li);
            }
        }
        
        banderaGastos = 1;
    }
}

// ------------------------- RESET VALORES -------------------------

let limpiarIngresos = document.getElementById("resetIngresos")
limpiarIngresos.onclick = () => {
    
    let padre1B = document.getElementById("mostrarIngresos");
    while (padre1B.hasChildNodes()) {
        padre1B.removeChild(padre1B.lastChild);
    }
    
    misIngresos.splice(0, misIngresos.length);
    banderaIngresos = 0;
    return banderaIngresos;
}

let limpiarGastos = document.getElementById("resetGastos")
limpiarGastos.onclick = () => {
    
    let padre2B = document.getElementById("mostrarGastos");
    while (padre2B.hasChildNodes()) {
        padre2B.removeChild(padre2B.lastChild);
    }
    misGastos.splice(0, misGastos.length);
    banderaGastos = 0;
    return banderaGastos;
}

// ------------------------- FUNCIONES SUMADORAS -------------------------

let totalIngresos = 0;
let totalGastos = 0;
let saldo = 0;

function sumarIngresos() {
    for (let i = 0; i < misIngresos.length; i++) {
        if ((misIngresos[i].concepto != "") && (misIngresos[i].monto != NaN) && (misIngresos[i].monto > 0)) {
            totalIngresos = totalIngresos + misIngresos[i].monto
        } else {
            totalIngresos = totalIngresos + 0
        }
    }
    return totalIngresos;
}

console.log(sumarIngresos())

function sumarGastos() {
    for (let i = 0; i < misGastos.length; i++) {
        if ((misGastos[i].concepto != "") && (misGastos[i].monto != NaN) && (misGastos[i].monto > 0)) {
            totalGastos = totalGastos + misGastos[i].monto
        } else {
            totalGastos = totalGastos + 0
        }
    }
    return totalGastos;
}

console.log(sumarGastos())


// ------------------------- CALCULADORA SALDOS -------------------------


let resumenSaldos = document.getElementById("botonResumen")
resumenSaldos.onclick = () => {
    
    if (banderaGastos == 1 && banderaIngresos == 1) {
        saldo = sumarIngresos() - sumarGastos();
        
        let contenedor = document.getElementById("saldos");
        let final = document.createElement("div");
        final.innerHTML = `
        <p> INGRESOS: $${totalIngresos}</p>
        <p> GASTOS: $${totalGastos}</p>
        <b> SALDO: $${saldo}</b>`;
        contenedor.appendChild(final);
    } else {
        alert("Ingresar al menos un (1) ingreso y un (1) gasto para poder calcular el saldo");
    }
}