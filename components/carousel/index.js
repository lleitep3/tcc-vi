function preloadImages(containerClass) {
    const container = document.querySelector(containerClass);
    const carouselItems = container.querySelectorAll('.carousel-item');

    const imageUrls = Array.from(carouselItems).map((item) => {
        const img = item.querySelector('img');
        return img.src;
    });

    imageUrls.forEach((imageSrc) => {
        const img = new Image();
        img.src = imageSrc;
    });
}

function doCarousel(containerClass) {
    const container = document.querySelector(containerClass);
    const carousel = container.querySelector('.carousel');
    const prevBtn = document.querySelector(`${containerClass} .btn-prev`);
    const nextBtn = document.querySelector(`${containerClass} .btn-next`);

    preloadImages(containerClass);

    container.appendChild(prevBtn);
    container.appendChild(nextBtn);

    let currentIndex = 0;
    let timer = 0;

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % carousel.children.length;
        updateCarousel();
        play()
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + carousel.children.length) % carousel.children.length;
        updateCarousel();
        play()
    });

    function updateCarousel() {
        const itemWidth = carousel.children[0].offsetWidth;
        const translateValue = -currentIndex * itemWidth;
        carousel.style.transform = `translateX(${translateValue}px)`;
    }

    function play() {
        clearInterval(timer)
        timer = setInterval(() => {
            currentIndex = (currentIndex + 1) % carousel.children.length;
            updateCarousel();
        }, 15000);
    }
    play()

    const carouselContainer = document.querySelector(".carousel-box")

    carouselContainer.addEventListener("click", (e) => {

        if (e.target.tagName !== "BUTTON") {
            carouselContainer.classList.toggle("activate-modal")
        }
    })
}