const carouselWrapper = document.querySelector('.carousel-wrapper');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

const imgURL = [
  {
    src: 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fus.123rf.com%2F450wm%2Fvaleo5%2Fvaleo51504%2Fvaleo5150400279%2F38943708-%25EB%25B9%2588-%25ED%259A%258C%25EC%2583%2589-%25EC%258A%25A4%25ED%258A%259C%25EB%2594%2594%25EC%2598%25A4-%25EB%25B0%25B0%25EA%25B2%25BD%25EC%259E%2585%25EB%258B%2588%25EB%258B%25A4-%25EB%25B0%25B0%25EA%25B2%25BD-%25EB%25B9%2588-%25EA%25B3%25B5%25EA%25B0%2584%25EC%259C%25BC%25EB%25A1%259C-%25EA%25B3%25B5%25EA%25B0%2584%25EC%259E%2585%25EB%258B%2588%25EB%258B%25A4-.jpg%3Fver%3D6&type=sc960_832',
    text: '구글 스프레드시트로 마케팅 데이터 분석하기',
  },
  {
    src: 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fus.123rf.com%2F450wm%2Fvaleo5%2Fvaleo51504%2Fvaleo5150400279%2F38943708-%25EB%25B9%2588-%25ED%259A%258C%25EC%2583%2589-%25EC%258A%25A4%25ED%258A%259C%25EB%2594%2594%25EC%2598%25A4-%25EB%25B0%25B0%25EA%25B2%25BD%25EC%259E%2585%25EB%258B%2588%25EB%258B%25A4-%25EB%25B0%25B0%25EA%25B2%25BD-%25EB%25B9%2588-%25EA%25B3%25B5%25EA%25B0%2584%25EC%259C%25BC%25EB%25A1%259C-%25EA%25B3%25B5%25EA%25B0%2584%25EC%259E%2585%25EB%258B%2588%25EB%258B%25A4-.jpg%3Fver%3D6&type=sc960_832',
    text: 'CRM 마케팅 이해하기',
  },
  {
    src: 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fus.123rf.com%2F450wm%2Fvaleo5%2Fvaleo51504%2Fvaleo5150400279%2F38943708-%25EB%25B9%2588-%25ED%259A%258C%25EC%2583%2589-%25EC%258A%25A4%25ED%258A%259C%25EB%2594%2594%25EC%2598%25A4-%25EB%25B0%25B0%25EA%25B2%25BD%25EC%259E%2585%25EB%258B%2588%25EB%258B%25A4-%25EB%25B0%25B0%25EA%25B2%25BD-%25EB%25B9%2588-%25EA%25B3%25B5%25EA%25B0%2584%25EC%259C%25BC%25EB%25A1%259C-%25EA%25B3%25B5%25EA%25B0%2584%25EC%259E%2585%25EB%258B%2588%25EB%258B%25A4-.jpg%3Fver%3D6&type=sc960_832',
    text: '검색광고(SA)이해하기',
  },
  {
    src: 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fus.123rf.com%2F450wm%2Fvaleo5%2Fvaleo51504%2Fvaleo5150400279%2F38943708-%25EB%25B9%2588-%25ED%259A%258C%25EC%2583%2589-%25EC%258A%25A4%25ED%258A%259C%25EB%2594%2594%25EC%2598%25A4-%25EB%25B0%25B0%25EA%25B2%25BD%25EC%259E%2585%25EB%258B%2588%25EB%258B%25A4-%25EB%25B0%25B0%25EA%25B2%25BD-%25EB%25B9%2588-%25EA%25B3%25B5%25EA%25B0%2584%25EC%259C%25BC%25EB%25A1%259C-%25EA%25B3%25B5%25EA%25B0%2584%25EC%259E%2585%25EB%258B%2588%25EB%258B%25A4-.jpg%3Fver%3D6&type=sc960_832',
    text: '디스플레이광고(DA)이해하기',
  },
];

let imgIdx = 0;

imgURL.forEach((img) => {
  const carouselSlide = document.createElement('div');
  carouselSlide.classList.add('carousel-slide');

  const carouselImg = document.createElement('img');
  carouselImg.classList.add('carousel-img');

  const carouselText = document.createElement('p');
  carouselText.classList.add('carousel-text');

  const carouselTag = document.createElement('p');
  carouselTag.classList.add('carousel-tag');

  carouselImg.src = img.src;
  carouselImg.alt = 'carousel image';

  carouselText.innerHTML = img.text;

  carouselSlide.appendChild(carouselText);
  carouselSlide.appendChild(carouselImg);
  carouselWrapper.appendChild(carouselSlide);
});

const carouselHandler = () => {
  if (imgIdx > imgURL.length - 1) {
    imgIdx = 0;
  }
  if (imgIdx < 0) {
    imgIdx = imgURL.length - 1;
  }

  carouselWrapper.style.transform = `translateX(-${imgIdx * 100}%)`;
};

prevBtn.addEventListener('click', () => {
  imgIdx--;
  carouselHandler();
});

nextBtn.addEventListener('click', () => {
  imgIdx++;
  carouselHandler();
});

setInterval(() => {
  imgIdx++;
  carouselHandler();
}, 2000);