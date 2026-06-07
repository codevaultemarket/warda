const particlesContainer = document.getElementById("particles");
const flowers = document.querySelectorAll(".flower");
const roses = document.querySelectorAll(".rose");

const PARTICLES_COUNT = 90;
const PETALS_COUNT = 22;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function createLightParticles() {
  for (let i = 0; i < PARTICLES_COUNT; i++) {
    const particle = document.createElement("span");

    particle.className = "light-particle";
    particle.style.left = `${random(0, 100)}%`;
    particle.style.top = `${random(0, 100)}%`;
    particle.style.animationDuration = `${random(5, 14)}s`;
    particle.style.animationDelay = `${random(0, 8)}s`;
    particle.style.opacity = random(0.2, 0.9);

    particlesContainer.appendChild(particle);
  }
}

function createFallingPetals() {
  for (let i = 0; i < PETALS_COUNT; i++) {
    const petal = document.createElement("span");

    petal.className = "falling-petal";
    petal.style.left = `${random(0, 100)}%`;
    petal.style.animationDuration = `${random(7, 16)}s`;
    petal.style.animationDelay = `${random(0, 12)}s`;
    petal.style.transform = `rotate(${random(0, 360)}deg)`;

    document.body.appendChild(petal);
  }
}

function mouseWindEffect(event) {
  const x = event.clientX / window.innerWidth - 0.5;
  const y = event.clientY / window.innerHeight - 0.5;

  flowers.forEach((flower, index) => {
    const power = (index + 1) * 5;

    flower.style.transform = `
      rotate(${x * power}deg)
      translateY(${y * 10}px)
    `;
  });

  roses.forEach((rose, index) => {
    const move = (index + 1) * 6;

    rose.style.filter = `
      drop-shadow(${x * move}px ${y * move}px 22px rgba(255,120,170,.55))
    `;
  });
}

function resetWindEffect() {
  flowers.forEach((flower) => {
    flower.style.transform = "";
  });

  roses.forEach((rose) => {
    rose.style.filter = "";
  });
}

function bloomEffect() {
  roses.forEach((rose, index) => {
    setTimeout(() => {
      rose.classList.add("bloom");
    }, index * 400);
  });
}

function addTouchGlow() {
  roses.forEach((rose) => {
    rose.addEventListener("mouseenter", () => {
      rose.classList.add("rose-active");
    });

    rose.addEventListener("mouseleave", () => {
      rose.classList.remove("rose-active");
    });

    rose.addEventListener("touchstart", () => {
      rose.classList.add("rose-active");

      setTimeout(() => {
        rose.classList.remove("rose-active");
      }, 800);
    });
  });
}

createLightParticles();
createFallingPetals();
bloomEffect();
addTouchGlow();

window.addEventListener("mousemove", mouseWindEffect);
window.addEventListener("mouseleave", resetWindEffect);
