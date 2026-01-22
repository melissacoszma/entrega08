const animalesEmojis: string[] = [
    '🐶', 
    '🐱', 
    '🐭', 
    '🐰', 
    '🦊', 
    '🐻'  
];


//  Algoritmo de Fisher-Yates:

function barajarArray<T>(array: T[]): T[] {                                                       // funcion que se le pasa un array (T)ipo --en este caso string-- y te devuelve un array del mismo (T)ipo
    const arrayBarajado = [...array];                                                             // spread, crea una copia del array para no modificar el original
    for (let i = arrayBarajado.length - 1; i > 0; i--) {                                          // bucle que recorre el array DESDE EL ULTIMO ELEMENTO, importante para que la probabilidad de movimiento de los elementos sea uniforme
        const j = Math.floor(Math.random() * (i + 1));                                            // generamos un numero aleatorio, multiplicamos por el numero de elementos del array y redondeamos para "eliminar" los decimales
        [arrayBarajado[i], arrayBarajado[j]] = [arrayBarajado[j], arrayBarajado[i]]; // esta línea equivale a:
        // const temp = arrayBarajado[i];
        //     arrayBarajado[i] = arrayBarajado[j];
        //     arrayBarajado[j] = temp;              
    }
    return arrayBarajado;
}

console.log("Array inicial: ", (animalesEmojis));
console.log('Animales barajados:', barajarArray(animalesEmojis));
console.log('Animales barajados:', barajarArray(animalesEmojis));
console.log('Animales barajados:', barajarArray(animalesEmojis));
console.log('Animales barajados:', barajarArray(animalesEmojis));                                  // siempre barajamos desde el original, hay varias opciones para barajar desde el ultimo arrayBarajado (no tan interesante para la aplicacion memoria)