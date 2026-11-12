
const image = document.getElementById("slide");

const images = [
    "img/1.jpg",
    "img/2.jpg",
    "img/3.jpg",
    "img/4.jpg",
    "img/5.jpg"
];

let imageIndex = 0;

// Слайд-шоу изображений
setInterval(() => {
    image.style.opacity = 0;

    setTimeout(() => {
        imageIndex++;

        if (imageIndex >= images.length) {
            imageIndex = 0;
        }

        image.src = images[imageIndex];
        image.style.opacity = 1;
    }, 500);

}, 4000);





document.querySelectorAll(".carousel").forEach(carousel => {
    const track = carousel.querySelector(".cards-track");
    const prev = carousel.querySelector(".prev");
    const next = carousel.querySelector(".next");

    const originalCards = Array.from(track.children);
    const visibleCards = 3;
    const originalCount = originalCards.length;

    originalCards.slice(-visibleCards).reverse().forEach(card => {
        track.prepend(card.cloneNode(true));
    });

    originalCards.slice(0, visibleCards).forEach(card => {
        track.append(card.cloneNode(true));
    });

    let index = visibleCards;
    let isAnimating = false;

    function getStep() {
        const card = track.querySelector(".card");
        const gap = parseFloat(getComputedStyle(track).gap) || 0;

        return card.getBoundingClientRect().width + gap;
    }

    function setPosition(animate) {
        track.style.transition = animate ? "transform 0.4s ease" : "none";
        track.style.transform = `translateX(${-index * getStep()}px)`;
    }

    setPosition(false);

    next.addEventListener("click", () => {
        if (isAnimating) return;

        isAnimating = true;
        index++;
        setPosition(true);
    });

    prev.addEventListener("click", () => {
        if (isAnimating) return;

        isAnimating = true;
        index--;
        setPosition(true);
    });

    track.addEventListener("transitionend", event => {
        if (event.propertyName !== "transform") return;

        if (index >= visibleCards + originalCount) {
            index = visibleCards;
        } else if (index < visibleCards) {
            index = visibleCards + originalCount - 1;
        } else {
            isAnimating = false;
            return;
        }

        track.style.transition = "none";
        track.style.transform = `translateX(${-index * getStep()}px)`;

        track.offsetHeight;

        requestAnimationFrame(() => {
            isAnimating = false;
        });
    });
});




const modal = document.querySelector('#modal');

document.querySelectorAll('.buy-button').forEach(button => {
    button.addEventListener('click', () => {
        console.log('Button clicked');
        modal.style.display = 'flex';
    });
});

document.querySelectorAll('.modal-close, .modal-ok').forEach(button => {
    button.addEventListener('click', () => {
        modal.style.display = 'none';
    });
});