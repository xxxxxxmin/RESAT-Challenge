const slider = document.getElementById('slider');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const dotsContainer = document.getElementById('dots-container');
let currentIndex = 0;

// 이미지 갯수에 따라 동그라미 추가
for (let i = 0; i < slider.childElementCount; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.setAttribute('data-index', i);
    dot.addEventListener('click', (event) => {
        currentIndex = parseInt(event.target.getAttribute('data-index'));
        updateSlider();
    });
    dotsContainer.appendChild(dot);
}

prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = slider.childElementCount - 1;
    }
    updateSlider();
});

nextButton.addEventListener('click', () => {
    if (currentIndex < slider.childElementCount - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateSlider();
});

function updateSlider() {
    const newTransformValue = -currentIndex * 100 + '%';
    slider.style.transform = 'translateX(' + newTransformValue + ')';

    // 동그라미 업데이트
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}
