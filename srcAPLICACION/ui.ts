import { 
    tablero, 
    cartas 
} from "./modelo";

import { 
    barajarCartas,
    voltearLaCarta,
    sonPareja,
    parejaEncontrada,
    parejaNoEncontrada
} from "./motor";

const iniciarPartida = (): void => {
  // baraja
  tablero.cartas = barajarCartas(cartas);

  console.log("Partida iniciada");
  console.log("Cartas barajadas:", tablero.cartas);

  // comienza la partida
  tablero.estadoPartida = "CeroCartasLevantadas";

  // pone todas las cartas boca abajo (vaciamos el src de img para que se vea mi fondo)
  ponerCartasBocaAbajo();
};

// carga el DOM
document.addEventListener('DOMContentLoaded', () => {
  // asigna el botón
  const botonStart = document.getElementById('botonstart');
  
  if (botonStart) {
    botonStart.addEventListener('click', iniciarPartida);
  }
  // añade event listeners a todas los divs contenedores 
  const todosLosFondos = document.querySelectorAll<HTMLDivElement>('.fondoemoji');
  console.log("Fondos encontrados:", todosLosFondos.length);

  todosLosFondos.forEach(fondo => {
  fondo.addEventListener('click', clickEnCarta);
  console.log("Listener añadido a fondo");
});
});

const ponerCartasBocaAbajo = (): void => {
  const imagenes = document.querySelectorAll<HTMLImageElement>('[data-indice-array]');
  
  imagenes.forEach(img => {
    img.src = ""; // vacia src
  });
};

// muestra la imagen de la carta que indiquemos
const mostrarCarta = (indice: number): void => {
  const img = document.querySelector<HTMLImageElement>(`[data-indice-array="${indice}"]`);
  
  if (img) {
    img.src = tablero.cartas[indice].imagen;
  }
};

// oculta la carta (pone src vacío)
const ocultarCarta = (indice: number): void => {  // ← AHORA ESTÁ FUERA
  const img = document.querySelector<HTMLImageElement>(`[data-indice-array="${indice}"]`);
  
  if (img) {
    img.src = "";
  }
};

const clickEnCarta = (event: Event): void => {
  //console.log("Click detectado en carta");

  const fondoClickeado = event.currentTarget as HTMLDivElement;
  
  // busca la img hijo del div y lee el data-indice-array
   const img = fondoClickeado.querySelector<HTMLImageElement>('[data-indice-array]');
  
  if (!img) {
    console.error("No se encontró la imagen con data-indice-array");
    return; //si NO hay img se sale
  }
  
  const indiceStr = img.dataset.indiceArray;

  if (indiceStr === undefined) {                            // sin esta parte el indiceStr da error por posible undef
    console.error("No se encontró data-indice-array");
    return;
  }
  
  const indice = parseInt(indiceStr, 10); // , 10  le indica a parseInt que quiero convertir el string a un número en base 10 (decimal)
  
  const estabaVuelta = tablero.cartas[indice].estaVuelta; // marcamos la carta como volteada

  voltearLaCarta(tablero, indice); // comprueba y voltea

  // muestra la carta SOLO si esta estaba bocabajo 
    if (!estabaVuelta && tablero.cartas[indice].estaVuelta) {
    mostrarCarta(indice);
  }
  // comprueba que tengamos 2 cartas volteadas
  if (tablero.estadoPartida === "DosCartasLevantadas") {
    const indicePrimeraCarta = tablero.indiceCartaVolteadaA!;
    const indiceSegundaCarta = tablero.indiceCartaVolteadaB!;
    
  // comprueba si son pareja
    if (sonPareja(indicePrimeraCarta, indiceSegundaCarta, tablero)) {
      // las mantiene volteadas
      parejaEncontrada(tablero, indicePrimeraCarta, indiceSegundaCarta);
    } else {
      // si no son pareja, esperamos 1 segundo y las ponemos boca abajo
      setTimeout(() => {
        parejaNoEncontrada(tablero, indicePrimeraCarta, indiceSegundaCarta);
        ocultarCarta(indicePrimeraCarta);
        ocultarCarta(indiceSegundaCarta);
      }, 500);
    }
  }
};