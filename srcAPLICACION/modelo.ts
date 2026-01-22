export interface Carta {
  idFoto: number; // id del 1 al 6 para 12 cartas, así identificamos rápido si es un gatito ,un perrito...
  // el ID se repete 2 veces en el array de cartas (hay dos cartas de un perro, hay dos cartas de un gato)
  imagen: string; // por comodidad repetimos la url de la imagen
  estaVuelta: boolean;
  encontrada: boolean;
}

// INTERFAZ
export interface InfoCarta {
  idFoto: number;    // identificador de las fotos
  imagen: string;    // url emojis
}

// ARRAY DE LOS EMOJIS
export const infoCartas: InfoCarta[] = [
  { 
    idFoto: 1, 
    imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/1.png" 
  }, // leon
  { 
    idFoto: 2, 
    imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/2.png" 
  }, // buho
  { 
    idFoto: 3, 
    imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/3.png" 
  }, // perro
  { 
    idFoto: 4, 
    imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/4.png" 
  }, // pollo
  { 
    idFoto: 5, 
    imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/5.png" 
  }, // cerdo
  { 
    idFoto: 6, 
    imagen: "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/6.png" 
  }  // abeja
];

const crearCartaInicial = (idFoto: number, imagen: string): Carta => ({
  idFoto,
  imagen,
  estaVuelta: false,
  encontrada: false,
});

const crearColeccionDeCartasInicial = (infoCartas: InfoCarta[]): Carta[] => {
  /* Aquí crearemos un array de cartas a partir de un array de infoCartas
     y duplicaremos las cartas para que haya dos de cada tipo.
  */
  const cartas: Carta[] = []; // creamos el array de cartas
  
  infoCartas.forEach(infoCarta => { // por cada carta en infoCartas, creamos 2 cartas
    cartas.push(crearCartaInicial(infoCarta.idFoto, infoCarta.imagen));
    cartas.push(crearCartaInicial(infoCarta.idFoto, infoCarta.imagen));
  });
  
  return cartas;
};

export let cartas: Carta[] = crearColeccionDeCartasInicial(infoCartas); // variable que contiene las 12 cartas para jugar

type EstadoPartida =       // estado de la partida en que nos podemos encontrar
  | "PartidaNoIniciada"
  | "CeroCartasLevantadas"
  | "UnaCartaLevantada"
  | "DosCartasLevantadas"
  | "PartidaCompleta";

export interface Tablero {      // estado completo del juego
  cartas: Carta[];
  estadoPartida: EstadoPartida;
  indiceCartaVolteadaA?: number;
  indiceCartaVolteadaB?: number;
}

const crearTableroInicial = (): Tablero => ({  // estado inicial del juego
  cartas: cartas,
  estadoPartida: "PartidaNoIniciada",
});

export let tablero: Tablero = crearTableroInicial();