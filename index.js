const alfabeto = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const inputOriginal = document.getElementById('input-original');
const cifrador = document.getElementById('cifrador');
const resultado = document.getElementById('resultado');
const rango = document.getElementById('rango');

const shifMessage = () => {
    const wordArray = [...inputOriginal.value.toUpperCase()];//el valor del campo de exto convertimos a mayuscula
    printChar(0, wordArray);
}

const printChar = (currentLetterIndex, wordArray) =>{
    if(wordArray.length === currentLetterIndex) return; //si la cantidad de caracter es la misma que la codificada, salimos
    inputOriginal.value = inputOriginal.value.substring(1)
    const spanChar = document.createElement("span");
    resultado.appendChild(spanChar);
    animateChar(spanChar)
        .then(()=> {
            const charSinCodificar = wordArray[currentLetterIndex];
            spanChar.innerHTML = alfabeto.includes(charSinCodificar)?
                alfabeto[(alfabeto.indexOf(charSinCodificar)+ parseInt(rango.value))%alfabeto.length]: //vemos en que indice del array de letra estamos 
                charSinCodificar  //y le sumamos el calor del odificador, si el valor ingresado no esta em la lista del array lo devolvemos
            printChar(currentLetterIndex+1, wordArray)//volvemos al ingresar al mismo metodo pero nos movemos a la siguiente letra del mensaje a encriptar
        });
}
   

//animacion
const animateChar = spanChar=>{
    let cambiosDeLetra=0;
    return new Promise(resolve =>{
        const intervalo = setInterval(()=>{  
            spanChar.innerHTML = alfabeto[Math.floor(Math.random() * alfabeto.length)];
            cambiosDeLetra++;
            if(cambiosDeLetra ===3){
                clearInterval(intervalo);
                resolve();            }   
        }, 50);
    })
}

const submit = e =>{
    e.preventDefault();
    resultado.innerHTML=''; //si movemos el encriptador se borra el mensaje anterior
    shifMessage();  //llamamos al metodo
}


cifrador.onsubmit = submit;