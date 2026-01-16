import "./style.css";


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

