

// clase constructora de objetos
class Dinero {
    constructor(concepto, monto) {
        this.concepto = concepto.toUpperCase();
        this.monto = parseInt(monto);
    }
}

// clase constructora de objetos localstorage
class TraerStorage {
    constructor(obj) {
        this.concepto = obj.concepto.toUpperCase();
        this.monto = parseInt(obj.monto);
    }
}


// función eliminadora de clases

function eliminarElementosClase(clase) {
    var clases = document.getElementsByClassName(clase);
    while (clases.length > 0) {
        clases[0].parentNode.removeChild(clases[0]);
    }
}


// Arrays agrupando objetos de ingreso/gasto
const misIngresos = [];
const misGastos = [];


// Declaración variables

let totalIngresos = 0;
let totalGastos = 0;
let saldo = 0;

let banderaSaldo = 0;
let banderaIngresos = 0;
let banderaGastos = 0;



// ------------------------- LOCALSTORAGE PREVIO -------------------------

let banderitaIngresos = (localStorage.getItem('flagIngresos') == '1');
if (banderitaIngresos) {
    
    const ingGuardados = JSON.parse(localStorage.getItem("ingresos"));
    for (const objeto of ingGuardados) {
        misIngresos.push(new TraerStorage(objeto));
    }
    
    let padrastro = document.getElementById("mostrarIngresos");
    
    for (const ingreso of misIngresos) {
        if ((ingreso.concepto != "") && (ingreso.monto != NaN) && (ingreso.monto > 0)) {
            let li = document.createElement("li");
            li.innerHTML = `Concepto: <b>${ingreso.concepto}</b>
            ------ <b>$${ingreso.monto}</b>`;
            padrastro.appendChild(li);
        } else {
            let li = document.createElement("li");
            li.innerHTML = `Concepto sin ingresar, o monto inválido`;
            padrastro.appendChild(li);
        }
    }
    totalIngresos = JSON.parse(localStorage.getItem("totalIngresos"));
    banderaIngresos = 1;
    localStorage.setItem('flagSaldo', '1');
}


let banderitaGastos = (localStorage.getItem('flagGastos') == '1');
if (banderitaGastos) {
    
    const gastGuardados = JSON.parse(localStorage.getItem("gastos"));
    for (const objeto of gastGuardados) {
        misGastos.push(new TraerStorage(objeto));
    }
    
    let padrastroB = document.getElementById("mostrarGastos");
    
    for (const egreso of misGastos) {
        if ((egreso.concepto != "") && (egreso.monto != NaN) && (egreso.monto > 0)) {
            let li = document.createElement("li");
            li.innerHTML = `Concepto: <b>${egreso.concepto}</b>
            ------ <b>$${egreso.monto}</b>`;
            padrastroB.appendChild(li);
        } else {
            let li = document.createElement("li");
            li.innerHTML = `Concepto sin ingresar, o monto inválido`;
            padrastroB.appendChild(li);
        }
    }
    totalGastos = JSON.parse(localStorage.getItem("totalGastos"));
    banderaGastos = 1;
    localStorage.setItem('flagSaldo', '1');
}



// ------------------------- FUNCIONES SUMADORAS -------------------------

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
        banderaSaldo = 1;
        totalIngresos = sumarIngresos();
        localStorage.setItem('ingresos', JSON.stringify(misIngresos))
        localStorage.setItem('flagIngresos', '1');
        localStorage.setItem('totalIngresos', JSON.stringify(totalIngresos));
        return banderaIngresos;
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
        banderaSaldo = 1;
        totalGastos = sumarGastos();
        localStorage.setItem('flagGastos', '1');
        localStorage.setItem('gastos', JSON.stringify(misGastos));
        localStorage.setItem('totalGastos', JSON.stringify(totalGastos));
        return banderaGastos;
    }
}


// ------------------------- RESET VALORES -------------------------

let limpiarIngresos = document.getElementById("resetIngresos")
limpiarIngresos.onclick = () => {
    let padre1B = document.getElementById("mostrarIngresos");
    while (padre1B.hasChildNodes()) {
        padre1B.removeChild(padre1B.lastChild);
    }
    
    eliminarElementosClase("borrar");
    misIngresos.splice(0, misIngresos.length);
    banderaIngresos = 0;
    banderaSaldo = 0;
    saldo = 0;
    totalIngresos = 0;
    localStorage.removeItem('saldo');
    localStorage.removeItem('ingresos');
    localStorage.removeItem('flagIngresos');
    localStorage.removeItem('flagSaldo');
    localStorage.removeItem('totalIngresos');
}

let limpiarGastos = document.getElementById("resetGastos")
limpiarGastos.onclick = () => {
    
    let padre2B = document.getElementById("mostrarGastos");
    while (padre2B.hasChildNodes()) {
        padre2B.removeChild(padre2B.lastChild);
    }
    
    eliminarElementosClase("borrar");
    misGastos.splice(0, misGastos.length);
    banderaGastos = 0;
    banderaSaldo = 0;
    saldo = 0;
    totalGastos = 0;
    localStorage.removeItem('gastos');
    localStorage.removeItem('flagGastos');
    localStorage.removeItem('flagSaldo');
    localStorage.removeItem('saldo');
    localStorage.removeItem('totalGastos');
}


let limpiarTodo = document.getElementById("resetTotal")
limpiarTodo.onclick = () => {
    limpiarGastos.onclick();
    limpiarIngresos.onclick();
    localStorage.clear();
    
    eliminarElementosClase("borrar");
    saldo = 0;
    totalGastos = 0;
    banderaSaldo = 0;
    totalIngresos = 0;
}



// ------------------------- CALCULADORA SALDOS -------------------------


let resumenSaldos = document.getElementById("botonResumen")

resumenSaldos.onclick = () => {
    
    if (banderaGastos == 1 && banderaIngresos == 1 && banderaSaldo == 1) {
        saldo = totalIngresos - totalGastos;
        let contenedor = document.getElementById("saldos");
        let final = document.createElement("div");
        final.innerHTML = `
        <p class= borrar> INGRESOS: $${localStorage.getItem('totalIngresos')}</p>
        <p class= borrar> GASTOS: $${localStorage.getItem('totalGastos')}</p>
        <b class= borrar> SALDO: $${saldo}</b>`;
        contenedor.appendChild(final);
        
        banderaSaldo = 0;
        localStorage.setItem('saldo', saldo);
        saldo = 0
        
        
    } else if ((localStorage.getItem('flagGastos') == '1' && localStorage.getItem('flagIngresos') == '1' && localStorage.getItem('flagSaldo') == '1') && banderaSaldo == 0) {
        
        let container = document.getElementById("saldos");
        let final2 = document.createElement("div");
        final2.innerHTML = `
        <p class= borrar> INGRESOS: $${localStorage.getItem('totalIngresos')}</p>
        <p class= borrar> GASTOS: $${localStorage.getItem('totalGastos')}</p>
        <b class= borrar> SALDO: $${localStorage.getItem('saldo')}</b>`;
        container.appendChild(final2);
        banderaSaldo = 2;
    }
}