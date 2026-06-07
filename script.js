// =========================================
// REALISTIC ROSE GARDEN
// Advanced Animation System
// =========================================

const particlesContainer = document.getElementById("particles");
const bloomBtn = document.getElementById("bloomBtn");
const nightBtn = document.getElementById("nightBtn");
const scene = document.querySelector(".scene");
const roses = document.querySelectorAll(".rose");

// =========================================
// Create Floating Particles
// =========================================

function createParticle() {
    const particle = document.createElement("div");

    particle.classList.add("particle");

    const size = Math.random() * 8 + 3;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    particle.style.left = `${Math.random() * 100}%`;

    particle.style.animationDuration =
        `${Math.random() * 8 + 8}s`;

    particle.style.animationDelay =
        `${Math.random() * 3}s`;

    particle.style.opacity =
        Math.random() * 0.8 + 0.2;

    particlesContainer.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, 18000);
}

setInterval(createParticle, 250);

// =========================================
// Falling Petals
// =========================================

function createPetal() {

    const petal = document.createElement("div");

    petal.style.position = "absolute";
    petal.style.top = "-50px";

    petal.style.left =
        `${Math.random() * window.innerWidth}px`;

    petal.style.width = "18px";
    petal.style.height = "28px";

    petal.style.borderRadius =
        "70% 30% 70% 30%";

    const colors = [
        "#ff4f7b",
        "#ff7fa4",
        "#ffbfd1",
        "#ffd6e2"
    ];

    petal.style.background =
        colors[Math.floor(Math.random() * colors.length)];

    petal.style.pointerEvents = "none";
    petal.style.zIndex = "999";

    document.body.appendChild(petal);

    let x =
        parseFloat(petal.style.left);

    let y = -50;

    const speed =
        Math.random() * 1.8 + 1;

    const drift =
        Math.random() * 2 - 1;

    const rotation =
        Math.random() * 360;

    let angle = rotation;

    const fall = setInterval(() => {

        y += speed;
        x += drift;

        angle += 2;

        petal.style.top = `${y}px`;
        petal.style.left = `${x}px`;

        petal.style.transform =
            `rotate(${angle}deg)`;

        if (y > window.innerHeight + 50) {
            clearInterval(fall);
            petal.remove();
        }

    }, 16);
}

setInterval(createPetal, 1400);

// =========================================
// Bloom Animation
// =========================================

function bloomGarden() {

    roses.forEach((rose, index) => {

        rose.style.transition =
            "transform 1.5s ease";

        rose.style.transform =
            "scale(0.2)";

        setTimeout(() => {

            rose.style.transform =
                "scale(1)";

        }, 200 + index * 250);

    });

}

bloomBtn.addEventListener(
    "click",
    bloomGarden
);

// =========================================
// Night Mode
// =========================================

let nightMode = false;

nightBtn.addEventListener("click", () => {

    nightMode = !nightMode;

    scene.classList.toggle("night");

    if (nightMode) {

        document.body.style.background =
            "#02030a";

        nightBtn.textContent =
            "Day Mode";

    } else {

        document.body.style.background =
            "#07090d";

        nightBtn.textContent =
            "Night Glow";
    }

});

// =========================================
// Mouse Parallax Effect
// =========================================

document.addEventListener("mousemove", e => {

    const mouseX =
        e.clientX / window.innerWidth - 0.5;

    const mouseY =
        e.clientY / window.innerHeight - 0.5;

    roses.forEach((rose, index) => {

        const depth =
            Number(
                rose.dataset.depth || 1
            );

        const moveX =
            mouseX * 20 * depth;

        const moveY =
            mouseY * 10 * depth;

        rose.style.transform =
            `translate(${moveX}px, ${moveY}px)`;

    });

});

// =========================================
// Random Wind Gusts
// =========================================

function windEffect() {

    roses.forEach((rose, index) => {

        const wind =
            (Math.random() * 8) - 4;

        rose.animate(

            [
                {
                    transform:
                        `rotate(0deg)`
                },

                {
                    transform:
                        `rotate(${wind}deg)`
                },

                {
                    transform:
                        `rotate(0deg)`
                }

            ],

            {
                duration: 2500,
                easing: "ease-in-out"
            }

        );

    });

}

setInterval(
    windEffect,
    5000
);

// =========================================
// Automatic Bloom Every 20 Seconds
// =========================================

setInterval(() => {
    bloomGarden();
}, 20000);

// =========================================
// Sparkle Effect
// =========================================

function createSparkle() {

    const sparkle =
        document.createElement("div");

    sparkle.style.position = "absolute";

    sparkle.style.width = "4px";
    sparkle.style.height = "4px";

    sparkle.style.borderRadius = "50%";

    sparkle.style.background =
        "white";

    sparkle.style.boxShadow =
        "0 0 15px white";

    sparkle.style.left =
        `${Math.random() * window.innerWidth}px`;

    sparkle.style.top =
        `${Math.random() * window.innerHeight}px`;

    sparkle.style.opacity = "0";

    document.body.appendChild(
        sparkle
    );

    sparkle.animate(

        [
            {
                opacity: 0,
                transform:
                    "scale(0)"
            },

            {
                opacity: 1,
                transform:
                    "scale(2)"
            },

            {
                opacity: 0,
                transform:
                    "scale(0)"
            }

        ],

        {
            duration:
                Math.random() * 2000 + 1000
        }

    );

    setTimeout(() => {
        sparkle.remove();
    }, 3000);
}

setInterval(
    createSparkle,
    300
);

// =========================================
// Initial Startup Animation
// =========================================

window.addEventListener(
    "load",
    () => {

        bloomGarden();

        for (let i = 0; i < 30; i++) {

            setTimeout(() => {

                createParticle();

            }, i * 100);

        }

    }
);

// =========================================
// Responsive Repositioning
// =========================================

window.addEventListener(
    "resize",
    () => {

        document
            .querySelectorAll(".particle")
            .forEach(el => el.remove());

    }
);

// =========================================
// Easter Egg
// Double Click Anywhere
// =========================================

document.addEventListener(
    "dblclick",
    () => {

        for (let i = 0; i < 25; i++) {

            setTimeout(() => {

                createPetal();

            }, i * 80);

        }

    }
);

console.log(
    "🌹 Realistic Rose Garden Loaded Successfully"
);
