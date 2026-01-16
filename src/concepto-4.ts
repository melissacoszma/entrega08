import "./style.css";


const cartas = document.querySelectorAll(".cartadiptico"); //crea un "array" con los elementos que compartan la clase desde el css




cartas.forEach((carta) => { //con foreach recorre cada elemento
  // y encuentra su dorso y reverso
  const dorso = carta.querySelector(".dorsocarta") as HTMLDivElement;
  const reverso = carta.querySelector(".reversocarta") as HTMLDivElement;
  
  
  // event listener para cada carta por separado, detro del foreach
  carta.addEventListener("click", () => {

    if (dorso.style.display === "block") {
      dorso.style.display = "none";
      reverso.style.display = 'block';
    } else {
      dorso.style.display = "block";
      reverso.style.display = "none";
    }
  });
  
  // indicamos como inicia en este caso DENTRO del foreach ya que es donde estan declarados dorso y reverso, si lo hacemos fuera hay que volver a meter un foreach y volver a declarar(hariamos el mismo recorrido dos veces)
  dorso.style.display = "block";
  reverso.style.display = "none";
});





// PROBLEMAS A LO LARGO DEL PROCESO

//  1. El esqueleto de la prueba de concepto 1 no se puede implementar en la 3. Los selectores usados en ese caso cogen unicamente el primer elemento que encuentran.
//  2. AddEventListener no puede usarse para NodeList (el array que se genera con este selector) hay que usarlo de forma INDIVIDUAL para cada elemento
