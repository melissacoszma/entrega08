import "./style.css";

console.log("Hello Typescript! prueba 2");

/*

const carta = document.getElementById("carta") as HTMLDivElement;
const dorsocarta = document.querySelector(".dorsocarta") as HTMLDivElement; //coge el primer elemento que coincida desde el css
const reversocarta = document.querySelector(".reversocarta") as HTMLDivElement;




//inicializamos 
dorsocarta.style.display = "block";
reversocarta.style.display = "none";
let mostrandoDorso = true;

//función para voltear la carta
function voltearCarta(): void {

  if (mostrandoDorso) {
    //mostrar reverso, ocultamos dorso
    dorsocarta.style.display = "none";
    reversocarta.style.display = "block";
    mostrandoDorso = false;
  } else {
    //mostrar dorso, ocultamos reverso
    dorsocarta.style.display = "block";
    reversocarta.style.display = "none";
    mostrandoDorso = true;
  }
}

// 3. Añadir event listener al botón

carta.addEventListener("click", voltearCarta); 

*/



const mostrarCarta = (urlImage: string) => {
    const elementoImagen = document.getElementById('carta-imagen');

    if (elementoImagen !== null && elementoImagen !== undefined && elementoImagen instanceof HTMLImageElement) {
        elementoImagen.src = urlImage;
    }
}

const divCarta = document.getElementById('divconcepto2');

if (divCarta !== null && divCarta !== undefined && divCarta instanceof HTMLDivElement) {
    divCarta.addEventListener('click', () => {
        mostrarCarta('https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/1.png');
    });
}
