let intentos = 6
const button = document.getElementById("guess-button")


window.addEventListener('load', init)
button.addEventListener("click", intenar)


function obtenerPalabra() {
    // Aquí deberías reemplazar la URL con la de tu API real
    return fetch('https://random-word-api.herokuapp.com/word?length=5')
        .then(response => response.json())
        .then(data => {
            // Supongamos que la API devuelve un array de palabras
            return data[0].toUpperCase();
        })
        .catch(error => {
            console.error('Error al obtener la palabra:', error);
            return 'APPLE'; // Fallback a una palabra por defecto en caso de error
        });
}

async function init() {
    console.log('Esto se ejecuta solo cuando se carga la página web');
    palabra = await obtenerPalabra();
    console.log(palabra);
}


function intenar(){
    const INTENTO = leerIntento();
    const regex = /\d/
    if(INTENTO.length != 5){
        alert("Solo palabras de cinco letras")   
        return
    }
    
    else if(INTENTO === palabra){
        terminar("<h1>GANASTE! :)</h1>")
        
    }
    else if (regex.test(INTENTO)){
        alert("Solo letras sin numeros")
        return
    }
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';
    for (let i in palabra){
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        if (INTENTO[i]===palabra[i]){ 
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'green';
        } else if( palabra.includes(INTENTO[i]) ) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'yellow';
        } else { 
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'grey';
        }
        ROW.appendChild(SPAN)
    }
    GRID.appendChild(ROW)
    intentos--
    if (intentos==0){
        terminar("<h1>PERDISTE!</h1>")
    }
}

function terminar(mensaje){
    const INPUT = document.getElementById("guess-input")
    const button = document.getElementById("guess-button")
    INPUT.disabled = true
    button.disabled = true;
    Swal.fire({
        title: mensaje,
        icon: mensaje.includes("GANASTE") ? 'success' : 'error',
        confirmButtonText: 'OK'
    })
}




function leerIntento(){
    let intento = document.getElementById("guess-input")
    intento = intento.value
    intento = intento.toUpperCase()
    return intento    
}




