let slideIndex = 1;
let intervalId;

window.addEventListener('load', () => {
  const slideContainer = document.querySelector('.slides');
  const originalSlides = document.querySelectorAll('.slides img');

  // Clonar el primero y el último
  const firstClone = originalSlides[0].cloneNode(true);
  const lastClone = originalSlides[originalSlides.length - 1].cloneNode(true);

  // Añadir clones al DOM
  slideContainer.appendChild(firstClone);
  slideContainer.insertBefore(lastClone, originalSlides[0]);

  const allSlides = document.querySelectorAll('.slides img');
  const slideWidth = allSlides[0].clientWidth;

  // Posicionar en el primer slide real
  slideContainer.style.transform = `translateX(-${slideWidth * slideIndex}px)`;

  // Iniciar desplazamiento automático
  intervalId = setInterval(() => {
    moverSlide(1, allSlides, slideContainer, slideWidth);
  }, 3000);

  // Corregir al llegar a los clones
  slideContainer.addEventListener('transitionend', () => {
    if (slideIndex === allSlides.length - 3) {
      // último (clon del primero)
      slideIndex = 1;
      slideContainer.classList.add('no-transition');
      slideContainer.style.transform = `translateX(-${slideWidth * slideIndex}px)`;
      setTimeout(() => {
        slideContainer.classList.remove('no-transition');
      }, 50);
    } else if (slideIndex === 0) {
      // primero (clon del último)
      slideIndex = allSlides.length - 2;
      slideContainer.classList.add('no-transition');
      slideContainer.style.transform = `translateX(-${slideWidth * slideIndex}px)`;
      setTimeout(() => {
        slideContainer.classList.remove('no-transition');
      }, 50);
    }
  });
});

function moverSlide(direccion, allSlides, slideContainer, slideWidth) {
  slideIndex += direccion;
  slideContainer.style.transition = 'transform 0.5s ease';
  slideContainer.style.transform = `translateX(-${slideWidth * slideIndex}px)`;
}

// Contador de visitas con localStorage
document.addEventListener("DOMContentLoaded", () => {
    let visitas = localStorage.getItem("contadorVisitas");

    if (visitas === null) {
        visitas = 1;
    } else {
        visitas = parseInt(visitas) + 1;
    }

    localStorage.setItem("contadorVisitas", visitas);
    

    const contadorElemento = document.getElementById("contador-visitas");
    if (contadorElemento) {
        contadorElemento.textContent = `Visitas: ${visitas}`;
    }
});

document.getElementById("btnBuscar").addEventListener("click", function () {
  let texto = document.getElementById("busqueda").value.trim();

  if (texto === "") {
    alert("Por favor escribe algo para buscar.");
    return;
  }

  // Revisar si está en la página actual
  if (document.body.innerText.toLowerCase().includes(texto.toLowerCase())) {
    // Resaltar y desplazarse
    resaltarTexto(texto);
    let encontrado = document.querySelector(`mark`);
    if (encontrado) {
      encontrado.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  } else {
    // Si no está, buscar en Google pero solo en tu dominio
    let dominio = "https://www.google.com/"; // <-- cámbialo cuando tengas tu dominio
    window.open(`https://www.google.com/search?q=site:${dominio} ${encodeURIComponent(texto)}`, "_blank");
  }
});

function resaltarTexto(palabra) {
  let regex = new RegExp(`(${palabra})`, "gi");
  document.body.innerHTML = document.body.innerHTML.replace(regex, `<mark style="background: yellow; color: red;">$1</mark>`);
}


