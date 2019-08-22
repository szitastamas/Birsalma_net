let currentlyActive = 0;

const landingText = document.querySelector('.landing-text-container');

window.onload = () => {
    document.getElementById('loading-screen').remove();
    setTimeout(function(){
        document.getElementById('landing-page').style.transform = "none";
        landingText.style.transform = "translate(-200px,-90px)";
    },100)
    carouselSlide.style.transform = "translateX(" + (-size * carouselCounter) + "px)";
}

window.onscroll = () => {
    landingText.style.transform = "translate(-200px," + pageYOffset/7 + "px)"
    if(isSectionInViewport(document.getElementById('thefruit'))){
        document.querySelector('#thefruit').style.opacity = "1";
    }
}

const menuBtn = document.querySelector('.menu-btn');
const navLink = document.querySelectorAll('.nav-link');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('menu-show');
    document.querySelector('.nav-links').classList.toggle('menu-show');
})

navLink.forEach(element => element.addEventListener('click', () => {
    document.querySelectorAll('.menu-show').forEach(item => item.classList.remove('menu-show'));
}))

const isSectionInViewport = el => {
    var rect = el.getBoundingClientRect();
  
    return (
      rect.bottom > 550 &&
      rect.right > 0 &&
      rect.left <= (window.innerWidth || document.documentElement.clientWidth) &&
      rect.top <=
        (window.innerHeight - (window.innerHeight*0.4) || document.documentElement.clientHeight - (window.innerHeight*0.4))
    );
  };

  function clearActives(){
      document.querySelectorAll('.is-active').forEach(item => item.classList.remove('is-active'));
      document.querySelectorAll('.card-show').forEach(card => card.classList.remove('card-show'));
  }

  const fruitListPoints = document.querySelectorAll('.thefruit-list-point'),
  fruitCards = document.querySelectorAll('.thefruit-card');

  fruitListPoints.forEach(listpoint => listpoint.addEventListener('click', (e) => {
    clearActives();
    e.target.classList.add('is-active');
    for(var i=0; i<fruitListPoints.length; i++){
        if(fruitListPoints[i].classList.contains('is-active')){
            currentlyActive = i;
        }
    }
    fruitCards[currentlyActive].classList.add('card-show');
  }))

/* CAROUSEL SECTION */

const carouselSlide = document.querySelector('.carousel-slide');
const carouselPics = document.querySelectorAll('.carousel-slide img');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

let carouselCounter = 1;
const size = 950;

nextBtn.addEventListener('click', () => {
    if(carouselCounter >= carouselPics.length-1) return;
    carouselSlide.style.transition = "transform 400ms ease-in-out";
    carouselCounter++;
    carouselSlide.style.transform = "translateX(" + (-size * carouselCounter) + "px)";
})

prevBtn.addEventListener('click', () => {
    if(carouselCounter <= 0) return;
    carouselSlide.style.transition = "transform 400ms ease-in-out";
    carouselCounter--;
    carouselSlide.style.transform = "translateX(" + (-size * carouselCounter) + "px)";
})

carouselSlide.addEventListener('transitionend', () => {
    if(carouselPics[carouselCounter].id === 'lastClone'){
        carouselSlide.style.transition = "none";
        carouselCounter = carouselPics.length-2;
        carouselSlide.style.transform = "translateX(" + (-size * carouselCounter) + "px)";
    }

    if(carouselPics[carouselCounter].id === 'firstClone'){
        carouselSlide.style.transition = "none";
        carouselCounter = carouselPics.length-carouselCounter;
        carouselSlide.style.transform = "translateX(" + (-size * carouselCounter) + "px)";
    }
})

console.log(carouselCounter);
