/* Wire up FireBase */

var firebaseConfig = {
    apiKey: "AIzaSyCxnEAwvvNPCPy1pMjCsQlm3fQBStsjuBA",
    authDomain: "birsalma-57942.firebaseapp.com",
    databaseURL: "https://birsalma-57942.firebaseio.com",
    projectId: "birsalma-57942",
    storageBucket: "birsalma-57942.appspot.com",
    messagingSenderId: "598839505955",
    appId: "1:598839505955:web:5a5976a36182bedadc2d96",
    measurementId: "G-NJQRZR90Y9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

/* ON DOM CONTENT LOADED */

const landingText = document.querySelector('.landing-text-container');

let callingSlider = setInterval(nextCarousel, 4000);


window.onload = () => {
    carouselCounter = 0;
    callingSlider;
    
    if(window.innerWidth <= 1355)
    {
        document.querySelectorAll('.about-us-title')[1].textContent = "Gyümölcseink védelme";
        document.querySelectorAll('.about-us-title')[0].textContent = "Termesztéstechnikánk";
    }
}

/* SCROLLING EFFECTS AND BEHAVIOUR */

window.onscroll = () => {
    landingText.style.transform = "translateY(" + pageYOffset/20 + "px)"
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
const pauseBtn = document.getElementById('pause-btn');
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
        progressBar.style.transition = "width 3400ms ease-in-out";
        progressBar.style.width = "100%";
    },400)
    carouselSlide.style.transition = "transform 400ms ease-in-out";
    carouselCounter++;
    carouselSlide.style.transform = "translateX(" + (-100 * carouselCounter) + "%)";
}

function prevCarousel(){
    progressBarFunction();
    if(carouselCounter <= 0) return;
    setTimeout(()=>{
        progressBar.style.transition = "width 3400ms ease-in-out";
        progressBar.style.width = "100%";
    },400)
    carouselSlide.style.transition = "transform 400ms ease-in-out";
    carouselCounter--;
    carouselSlide.style.transform = "translateX(" + (-100 * carouselCounter) + "%)";
};

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

carouselPics.forEach(pic => pic.addEventListener('mouseover', ()=>{
    clearInterval(callingSlider);
    progressBar.style.transition = "none";
    pauseBtn.style.opacity = ".7";
    progressBar.style.width = "0";
}))

carouselPics.forEach(pic => pic.addEventListener('mouseleave', ()=>{
    callingSlider = setInterval(nextCarousel, 4000);
    progressBar.style.transition = "width 3400ms ease-in-out";
    pauseBtn.style.opacity = "0";
    progressBar.style.width = "100%";
}))





/* CONTACT FORM */

// Reference messages collection
var messagesRef = firebase.database().ref('messages');

const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', submitContact);
const alertMsg = document.querySelector('.alert');

const checkBoxOverlay = document.querySelector('.checkbox-overlay');

checkBoxOverlay.onclick = () => {
    checkBoxOverlay.classList.toggle('checked');
    if(checkBoxOverlay.classList.contains('checked')){
        document.getElementById('privacy-check-box').checked = true;
    }else{
        document.getElementById('privacy-check-box').checked = false;
    }
}
function isChecked ()
    { 
        return document.getElementById('privacy-check-box').checked;
    }


function submitContact(e){
    e.preventDefault();

    if(!isChecked()){
        checkBoxOverlay.classList.add('check-me');
        setTimeout(() => checkBoxOverlay.classList.remove('check-me'), 1500)
        e.preventDefault();
    }else{

        var name = getInputValue('name');
        var company = getInputValue('company');
        var email = getInputValue('email');
        var phone = getInputValue('phone');
        var message = getInputValue('message');
    
        saveMessage(name, company, email, phone, message);
        
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

        checkBoxOverlay.classList.remove('checked');
        
        document.getElementById("name").value = "";
        document.getElementById("company").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("message").value = "";
    }


}

let alertClass = "";
let alertText = "";
function alertStyling(){

    alertClass = "success"
    alertText = "Köszönjük a levelét!"
    contactForm.reset();
    
    return alertClass;
}

function getInputValue(id){
    return document.getElementById(id).value;
}

//Save message to firebase
function saveMessage(name, company, email, phone, message){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
      name: name,
      company:company,
      email:email,
      phone:phone,
      message:message
    });
  }

// Responsive behaviour

  const aboutTextCardTitle = document.querySelectorAll('.about-us-title');

  aboutTextCardTitle.forEach(title => title.addEventListener('click',(e) => {
       e.target.nextElementSibling.classList.toggle('card-open');
       e.target.nextElementSibling.nextElementSibling.classList.toggle('card-open');

  }))
