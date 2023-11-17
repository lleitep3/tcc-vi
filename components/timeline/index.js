

function buildHTML(item, side, color) {

    return `
    <div class="box-timeline__item ${side} ${color}">
    <div class="center-content">
        <div class="circle">
            <div class="img-wrap">
                <img src="./assets/images/pessoas/${item.image}" />
            </div>
            <div class="cable"></div>
            <div class="info-wrap">
                <div class="bar"></div>
                <div class="info">
                    <h4>${item.title}</h4>
                    <span>${item.subtitle}</span>
                    <p>${item.description}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="center-point">
        <div class="bar left"></div>
        <div class="circle">
            <div class="cable"></div>
        </div>
        <div class="bar right"></div>
    </div>
    <div class="year">${item.year}</div>
</div>
    `
}


async function doTimeline(selector) {
    const container = document.querySelector(selector);

    const timelineData = await fetch('./components/timeline/timeline-data.json')
        .then(response => response.json());

    const color = {
        0: 'purple',
        1: 'red',
        2: 'yellow'
    }

    const side = {
        0: 'up',
        1: 'down',
    }

    const html = timelineData.reduce((html, item, index) => html + buildHTML(item, side[index % 2], color[(index % 3)]), '')

    container.innerHTML = html

    let mouseDown = false;
    let startX, scrollLeft;

    const startDragging = (e) => {
        mouseDown = true;
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    }

    const stopDragging = (e) => {
        mouseDown = false;
    }

    const move = (e) => {
        e.preventDefault();
        if (!mouseDown) { return; }
        const x = e.pageX - container.offsetLeft;
        const scroll = x - startX;
        container.scrollLeft = scrollLeft - scroll;
    }

    // Add the event listeners
    container.addEventListener('mousemove', move, false);
    container.addEventListener('mousedown', startDragging, false);
    container.addEventListener('mouseup', stopDragging, false);
    container.addEventListener('mouseleave', stopDragging, false);
}