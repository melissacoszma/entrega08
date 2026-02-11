import { 
    tablero,  
} from "./modelo";

import { 
    barajarCartas,
    voltearLaCarta,
    sonPareja,
    parejaEncontrada,
    parejaNoEncontrada
} from "./motor";

const iniciarPartida = (): void => {
  // resetea el estado de todas las cartas
  tablero.cartas.forEach(carta => {
    carta.estaVuelta = false;
    carta.encontrada = false;
  });

  // baraja
  tablero.cartas = barajarCartas(tablero.cartas);

 /*console.log("Partida iniciada");
  console.log("Cartas barajadas:", tablero.cartas); */

  // comienza la partida
  tablero.estadoPartida = "CeroCartasLevantadas";
  
  // resetea los índices
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;

  // pone todas las cartas boca abajo
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

/* const clickEnCarta = (event: Event): void => {                                                                                                     /////////// dividir esta funcion en varias funciones más pequeñas 
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
}; */

// obtiene el índice de la carta desde el click
const obtenerIndiceDesdeEvento = (evento: Event): number | null => {
  const fondoClickeado = evento.currentTarget as HTMLDivElement;
  const img = fondoClickeado.querySelector<HTMLImageElement>('[data-indice-array]');
  
  if (!img) {
    console.error("No se encontró la imagen con data-indice-array");
    return null;
  }
  
  const indiceStr = img.dataset.indiceArray;

  if (indiceStr === undefined) {
    console.error("No se encontró data-indice-array");
    return null;
  }
  
  return parseInt(indiceStr, 10);
};

// intenta voltear una carta y mostrarla si corresponde
const intentarVoltearCarta = (indice: number): void => {
  const estabaVuelta = tablero.cartas[indice].estaVuelta;
  
  voltearLaCarta(tablero, indice);
  
  // muestra la carta SOLO si estaba boca abajo y ahora está vuelta
  if (!estabaVuelta && tablero.cartas[indice].estaVuelta) {
    mostrarCarta(indice);
  }
};

// procesa el estado cuando hay dos cartas levantadas
const procesarDosCartasLevantadas = (): void => {
  const indicePrimeraCarta = tablero.indiceCartaVolteadaA!;
  const indiceSegundaCarta = tablero.indiceCartaVolteadaB!;
  
  if (sonPareja(indicePrimeraCarta, indiceSegundaCarta, tablero)) {
    parejaEncontrada(tablero, indicePrimeraCarta, indiceSegundaCarta);
  } else {
    manejarParejaNoencontrada(indicePrimeraCarta, indiceSegundaCarta);
  }
};

// maneja cuando las cartas no son pareja (oculta con delay)
const manejarParejaNoencontrada = (indicePrimera: number, indiceSegunda: number): void => {
  setTimeout(() => {
    parejaNoEncontrada(tablero, indicePrimera, indiceSegunda);
    ocultarCarta(indicePrimera);
    ocultarCarta(indiceSegunda);
  }, 500);
};

// función principal refactorizada
const clickEnCarta = (event: Event): void => {
  const indice = obtenerIndiceDesdeEvento(event);
  
  if (indice === null) {
    return;
  }
  
  intentarVoltearCarta(indice);
  
  if (tablero.estadoPartida === "DosCartasLevantadas") {
    procesarDosCartasLevantadas();
  }
};