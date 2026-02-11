import "./style.css";





const mostrarCartaPC4 = (urlImage: string, elementoImagenId: string) => {
    const elementoImagen = document.getElementById(elementoImagenId);

    
    if (elementoImagen !== null && elementoImagen !== undefined && elementoImagen instanceof HTMLImageElement) {
        elementoImagen.src = urlImage;
    }
}


const divCarta1 = document.getElementById("divconcepto4-1");
const divCarta2 = document.getElementById("divconcepto4-2");


if (divCarta1 !== null && divCarta1 !== undefined && divCarta1 instanceof HTMLDivElement) {
    divCarta1.addEventListener('click', () => {
        mostrarCartaPC4('https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/6.png', "carta-imagen13");
    });
}

if (divCarta2 !== null && divCarta2 !== undefined && divCarta2 instanceof HTMLDivElement) {
    divCarta2.addEventListener('click', () => {
        mostrarCartaPC4('https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/memo/2.png', "carta-imagen14");
    });
}
