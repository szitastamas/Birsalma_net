/* ON DOM CONTENT LOADED */

const landingText = document.querySelector('.landing-text-container');

let callingSlider = setInterval(nextCarousel, 4000);


window.onload = () => {
    document.getElementById('loading-screen').remove();
    setTimeout(function(){
        document.getElementById('landing-page').style.transform = "none";
        landingText.style.transform = "none";
    },100)
    carouselCounter = 0;
    callingSlider;
}

let bckgPicPos = 0
if(window.innerWidth > 1440){
    bckgPicPos = 1050
}else if(window.innerWidth <= 1440 && window.innerWidth >= 1025){
    bckgPicPos = 850;
}else if(window.innerWidth < 1025){
    bckgPicPos = 450;
}

/* SCROLLING EFFECTS AND BEHAVIOUR */

window.onscroll = () => {
    landingText.style.transform = "translateY(" + pageYOffset/7 + "px)"
    document.getElementById('landing-page').style.backgroundPositionX = bckgPicPos-(pageYOffset/9) + "px";
    if(isSectionInViewport(document.getElementById('thefruit'))){
        document.querySelector('#thefruit').style.opacity = "1";
    }
}

/* RESPONSIVE MENU */

const menuBtn = document.querySelector('.menu-btn');
const navLink = document.querySelectorAll('.nav-link');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('menu-show');
    document.querySelector('.nav-links').classList.toggle('menu-show');
})

navLink.forEach(element => element.addEventListener('click', () => {
    document.querySelectorAll('.menu-show').forEach(item => item.classList.remove('menu-show'));
}))

/* IS SECTION IN VIEWPORT */

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

  /* FRUIT INFO CARDS */

  function clearActives(){
      document.querySelectorAll('.is-active').forEach(item => item.classList.remove('is-active'));
      document.querySelectorAll('.card-show').forEach(card => card.classList.remove('card-show'));
  }

  let currentlyActive = 0;

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
const carouselPics = document.querySelectorAll('.carousel-slide-card');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const progressBar = document.getElementById('progress-bar');

let carouselCounter = 1;

function progressBarFunction(){
    progressBar.style.transition = "none";
    progressBar.style.width = "0%";
}

function nextCarousel(){
    progressBarFunction();
    if(carouselCounter >= carouselPics.length-1) return;
    setTimeout(()=>{
        progressBar.style.transition = "width 3800ms";
        progressBar.style.width = "100%";
    },5)
    carouselSlide.style.transition = "transform 400ms ease-in-out";
    carouselCounter++;
    carouselSlide.style.transform = "translateX(" + (-100 * carouselCounter) + "%)";
}

function prevCarousel(){
    progressBarFunction();
    if(carouselCounter <= 0) return;
    setTimeout(()=>{
        progressBar.style.transition = "width 3800ms";
        progressBar.style.width = "100%";
    },10)
    carouselSlide.style.transition = "transform 400ms ease-in-out";
    carouselCounter--;
    carouselSlide.style.transform = "translateX(" + (-100 * carouselCounter) + "%)";
};

carouselSlide.addEventListener('mouseover', ()=>{
    clearInterval(callingSlider);
})

carouselSlide.addEventListener('mouseleave', ()=>{
    callingSlider = setInterval(nextCarousel, 4000);
})

nextBtn.addEventListener('click', ()=>{
    clearInterval(callingSlider);
    nextCarousel();
    callingSlider = setInterval(nextCarousel, 4000);
})

prevBtn.addEventListener('click', () => {
    clearInterval(callingSlider);
    prevCarousel();
    callingSlider = setInterval(nextCarousel, 4000);
})

carouselSlide.addEventListener('transitionend', () => {
    if(carouselPics[carouselCounter].id === 'lastClone'){
        carouselSlide.style.transition = "none";
        carouselCounter = carouselPics.length-2;
        carouselSlide.style.transform = "translateX(" + (-100 * carouselCounter) + "%)";
    }

    if(carouselPics[carouselCounter].id === 'firstClone'){
        carouselSlide.style.transition = "none";
        carouselCounter = carouselPics.length-carouselCounter;
        carouselSlide.style.transform = "translateX(" + (-100 * carouselCounter) + "%)";
    }
})


/* CONTACT FORM */

// Reference messages collection
//var messagesRef = firebase.database().ref('messages');

const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', submitContact);
const alertMsg = document.querySelector('.alert');

function submitContact(e){
    e.preventDefault();

    var name = getInputValue('name');
    var company = getInputValue('company');
    var email = getInputValue('email');
    var phone = getInputValue('phone');
    var message = getInputValue('message');

    //saveMessage(name, company, email, phone, message);
    
    alertMsg.style.opacity = "1";
    alertMsg.style.transform = "none";
    alertMsg.style.zIndex = "10";
    alertMsg.classList.add(alertStyling());
    alertMsg.innerHTML =
        `<h2 style="margin-bottom: 2rem">Kedves ${name}!</h2>
        <p>${alertText}</p>
        `

    setTimeout(() => {
        alertMsg.style.opacity = "0";
        alertMsg.style.transform = "scale(.3)";
        alertMsg.style.zIndex = "-5";
        alertMsg.innerHTML = "";
        alertMsg.classList = "alert";
    }, 3000)

    setTimeout(() => {
        alertMsg.style.transform = "translateY(-15rem)";
    }, 3500)

}

let alertClass = "";
let alertText = "";
function alertStyling(){
    if(getInputValue('name').length < 7 || getInputValue('message').length < 8){
        alertClass = "error"
        alertText = "Kérem töltsön ki megfelelően minden mezőt!"
    }
    else{
        alertClass = "success"
        alertText = "Köszönjük a levelét!"
        contactForm.reset();
    }

    return alertClass;
}

function getInputValue(id){
    return document.getElementById(id).value;
}

// Save message to firebase
// function saveMessage(name, company, email, phone, message){
//     var newMessageRef = messagesRef.push();
//     newMessageRef.set({
//       name: name,
//       company:company,
//       email:email,
//       phone:phone,
//       message:message
//     });
//   }
