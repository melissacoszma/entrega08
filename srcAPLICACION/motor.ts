import { 
    Carta, 
    Tablero 
} from "./modelo";

/*
En el motor nos va a hacer falta un método para barajar cartas
*/ 

// fisher-yates
export const barajarCartas = (cartas: Carta[]): Carta[] => {

  const cartasBarajadas = [...cartas];
  
  for (let i = cartasBarajadas.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    
    [cartasBarajadas[i], cartasBarajadas[j]] = [cartasBarajadas[j], cartasBarajadas[i]];
  }
  return cartasBarajadas;
};

// funcion para no repert codigo
const reiniciarIndicesCartas = (tablero: Tablero): void => {
  tablero.indiceCartaVolteadaA = undefined;
  tablero.indiceCartaVolteadaB = undefined;
};


/*
  Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
*/

const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number): boolean => {
  // verificar que el indice se encuentre entre 0 e i
  if (indice < 0 || indice >= tablero.cartas.length) {
    return false;
  }
  
  const carta = tablero.cartas[indice];
  
  // no permite voltear si está encontrada
  if (carta.encontrada) {
    return false;
  }
  
  // no permite voltear si ya está volteada
  if (carta.estaVuelta) {
    return false;
  }
  
  // dependiendo del estado de la partida
  switch (tablero.estadoPartida) {
    case "PartidaNoIniciada":
      return false; // no permite voltear si la partida no ha empezado
      
    case "CeroCartasLevantadas":
      return true; // se puede voltear cualquier carta la primera vez
      
    case "UnaCartaLevantada":
      return indice !== tablero.indiceCartaVolteadaA; // se puede voltear si no es la misma que ya está volteada
      
    case "DosCartasLevantadas":
      return false; // ya hay dos cartas volteadas y hay que resolver primero
      
    case "PartidaCompleta":
      return false; // el juego ha terminado o no quedan cartas por voltear
      
    default:
      return false;
  }
};

export const voltearLaCarta = (tablero: Tablero, indice: number): void => {
  // verifica que se pueda voltear
  if (!sePuedeVoltearLaCarta(tablero, indice)) {  // si NO se puede voltear
    return; // sale sin hacer nada para no recorrer los pasos siguientes hasta averiguarlo
  }
  
  // si sí que se puede voltear, manrca la carta como volteada
  tablero.cartas[indice].estaVuelta = true;
  
  // actualiza el estado de la partida y guarda indices
  switch (tablero.estadoPartida) {
    case "CeroCartasLevantadas":
      // si el estado anterior era CeroCartasLevantadas 
      tablero.estadoPartida = "UnaCartaLevantada"; // asigna el siguiente estado
      tablero.indiceCartaVolteadaA = indice;
      break;
      
    case "UnaCartaLevantada":
      // si el estado anterior era UnaCartaLevantada
      tablero.estadoPartida = "DosCartasLevantadas"; // asigna el siguiente estado, este estado lo "resetean" las funciones ParejaEnconmtrada y ParejaNoEncontrada 
      tablero.indiceCartaVolteadaB = indice;
      break;
  }
};




/*
  Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id
*/

export const sonPareja = (indicePrimeraCarta: number, indiceSegundaCarta: number, tablero: Tablero): boolean => { // he tenido que cambiar la nomenclatura de los parametros ya que para mí estaba siendo dificil de asimilar de forma logica de esa manera... 
  // asigna las cartas a través de los indices
  const cartaA = tablero.cartas[indicePrimeraCarta];
  const cartaB = tablero.cartas[indiceSegundaCarta];

  // compara que tengan el mismo idFoto para que sean pareja
  return cartaA.idFoto === cartaB.idFoto;

  // esta linea equivale a: 

  /* if (cartaA.idFoto === cartaB.idFoto) {
  return true;
  } 
  else {
    return false;
  } */      // intentamos evitart la redundancia

};




/*
  Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa.
*/

export const parejaEncontrada = (tablero: Tablero, indicePrimeraCarta: number, indiceSegundaCarta: number): void => { 
  // marca ambas cartas como encontradas porque SI son pareja > cartaA.idFoto === cartaB.idFoto = true
  tablero.cartas[indicePrimeraCarta].encontrada = true;
  tablero.cartas[indiceSegundaCarta].encontrada = true;
   
  // comprueba si todas las cartas tienen el atributo .encontrada
  if (esPartidaCompleta(tablero)) {
    tablero.estadoPartida = "PartidaCompleta";  // si lo tienen se acaba el juego
  }
  else {
    tablero.estadoPartida = "CeroCartasLevantadas"; // si no lo tiene el juego sigue
  }

  // reset a los índices guardados que ya están comparados
  reiniciarIndicesCartas(tablero);
};

/*
  Aquí asumimos que no son pareja y las volvemos a poner boca abajo
*/
export const parejaNoEncontrada = (tablero: Tablero, indicePrimeraCarta: number, indiceSegundaCarta: number): void => {
  // "desvoltea" las cartas ya que NO son pareja (resultado del return false)
  tablero.cartas[indicePrimeraCarta].estaVuelta = false;
  tablero.cartas[indiceSegundaCarta].estaVuelta = false; 

  // reset a los índices guardados que ya están comparados
  reiniciarIndicesCartas(tablero);

  // actualiza el estado para seguir jugando, asumimos todavia que no hay maximo de intentos por lo que siempre que no se encuentre una pareja el juego sigue 
  tablero.estadoPartida = "CeroCartasLevantadas";

};




/*
  Esto lo podemos comprobar o bien utilizando every, o bien utilizando un contador (cartasEncontradas)
*/

const esPartidaCompleta = (tablero: Tablero): boolean => {
  return tablero.cartas.every(carta => carta.encontrada);
  };