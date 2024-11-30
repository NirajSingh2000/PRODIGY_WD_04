let words = document.querySelectorAll(".word");

words.forEach((word) => {
    let letters = word.textContent.split("");
    word.textContent = "";
    letters.forEach((letter) => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.appendChild(span);
    });
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";

let changeText = () => {
    let currentword = words[currentWordIndex];
    let nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

    Array.from(currentword.children).forEach((letter, i) => {
        setTimeout(() => {
            letter.className = "letter out";
        }, i * 80);
    });
    nextWord.style.opacity = "1";
    Array.from(nextWord.children).forEach((letter, i) => {
        letter.className = "letter behind";
        setTimeout(() => {
            letter.className = "letter in";
        }, 340 + i * 80);
    });
    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

changeText();
setInterval(changeText, 3000);

// circle skill ////////////////////////////////////////////////////////

const circles = document.querySelectorAll('.circle');
circles.forEach(elem=>{
    var dots = elem.getAttribute("data-dots");
    var marked = elem.getAttribute("data-percent");
    var percent = Math.floor(dots*marked/100);
    var points = "";
    var rotate = 360 / dots;


    for(let i = 0 ; i < dots ; i++){
    points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
    }
    elem.innerHTML = points;

    const pointsMarked = elem.querySelectorAll('.points');
    for(let i = 0; i<percent ; i++){
        pointsMarked[i].classList.add('marked')
    }
})


// mix it up portfolio section
var mixer = mixitup('.portfolio-gallery');




// active menu /////////////////////////////////////////////////
let menuLi = document.querySelectorAll('header ul li a');
let section = document.querySelectorAll('section');


function activeMenu(){
    let len = section.length;
    while(--len && window.scrollY + 97 < section[len].offsetTop){};
    menuLi.forEach(sec => sec.classList.remove("active"));
    menuLi[len].classList.add("active");
}

activeMenu();
window.addEventListener("scroll",activeMenu);


// sticky navbar /////////////////////////////////////////////////
const header = document.querySelector("header");
window.addEventListener("scroll",function(){
    header.classList.toggle("sticky",window.scrollY > 50)
})

// toggle icon navbar ////////////////////////////////////////////////
let menuIcon = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");

menuIcon.onclick = ()=>{
    menuIcon.classList.toggle("bx-x");
    navlist.classList.toggle("open");
}


window.onscroll = ()=>{
    menuIcon.classList.remove("bx-x");
    navlist.classList.remove("open");
}

// parallax ////////////////////////////////////////////////

const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show-items");
        }else{
            entry.target.classList.remove("show-items");
        }
    });
});

const scrollScale = document.querySelectorAll(".scroll-scale");
scrollScale.forEach((el)=>observer.observe(el));

const scrollBottom = document.querySelectorAll(".scroll-bottom");
scrollBottom.forEach((el)=>observer.observe(el));

const scrollTop = document.querySelectorAll(".scroll-top");
scrollTop.forEach((el)=>observer.observe(el));



function sendEmail(url) {
    window.location.href = url;
  }
 //Flash Message Notification on Title
 function flashTitleNotification(){
    var originalTitle = document.title;
    var isFlash = false;
    function changeTitle(){
        document.title = isFlash ?
        "Engineer ❤️ | Portfolio" : originalTitle;
        isFlash = !isFlash;
    }
    setInterval(changeTitle, 1000);
}
window.onload = flashTitleNotification;
//internet connection JS
	// Selecting all required elements
    const wrapper = document.querySelector(".wrappers1"),
        toast = wrapper.querySelector(".toasts"),
        title = toast.querySelector("span"),
        subTitle = toast.querySelector("p"),
        wifiIcon = toast.querySelector(".icons1"),
        closeIcon = toast.querySelector(".close-icons");
        
        window.onload = ()=>{
            function ajax(){
                let xhr = new XMLHttpRequest(); //creating new XML object
                xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true); //sending get request on this URL
                xhr.onload = ()=>{ //once ajax loaded
                    //if ajax status is equal to 200 or less than 300 that mean user is getting data from that provided url
                    //or his/her response status is 200 that means he/she is online
                    if(xhr.status == 200 && xhr.status < 300){
                        toast.classList.remove("offline");
                        title.innerText = "Your connection is restored";
                        subTitle.innerText = "Please Continue Exploring!";
                        wifiIcon.innerHTML = '<i class="uil uil-wifi"></i>';
                        closeIcon.onclick = ()=>{ //hide toast notification on close icon click
                            wrapper.classList.add("hide");
                        }
                        setTimeout(()=>{ //hide the toast notification automatically after 5 seconds
                            wrapper.classList.add("hide");
                        }, 0);
                    }else{
                        offline(); //calling offline function if ajax status is not equal to 200 or not less that 300
                    }
                }
                xhr.onerror = ()=>{
                    offline(); ////calling offline function if the passed url is not correct or returning 404 or other error
                }
                xhr.send(); //sending get request to the passed url
            }
        
            function offline(){ //function for offline
                wrapper.classList.remove("hide");
                toast.classList.add("offline");
                title.innerText = "You're offline now";
                subTitle.innerText = "Opps! Internet is disconnected.";
                wifiIcon.innerHTML = '<i class="uil uil-wifi-slash"></i>';
            }
        
            setInterval(()=>{ //this setInterval function call ajax frequently after 100ms
                ajax();
            }, 100);
        }
      