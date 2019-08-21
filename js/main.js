let currentlyActive = 0;

window.onload = () => {
    document.getElementById('loading-screen').remove();
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

window.onscroll = () => {
    if(window.innerWidth > 874){
        if(pageYOffset > 70){
             document.querySelector('.nav-text-container').style.maxHeight = "0";
         }
    else{
            document.querySelector('.nav-text-container').style.maxHeight = "70px"
    }
}
}

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

//   function rearrangingCards(){
//       fruitCards.forEach(function(card){
//           if(card.classList.contains('card-show')) {card.style.transform = "none"}
//           else{card.style.transform = "translateY(-100%)"};
//       })
//  }