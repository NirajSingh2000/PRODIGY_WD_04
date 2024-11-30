// nav background
let header = document.querySelector("header");

window.addEventListener("scroll", () => {
    header.classList.toggle("shadow", window.scrollY > 0)
})

//Filter
$(document).ready(function () {
    $(".filter-item").click(function () {
        const value = $(this).attr("data-filter");
        if (value == "all"){
            $(".post-box").show("1000")
        } else{
            $(".post-box")
                .not("." + value)
                .hide(1000);
            $(".post-box")
            .filter("." + value)
            .show("1000")
        }
    });
    $(".filter-item").click(function () {
        $(this).addClass("active-filter").siblings().removeClass("active-filter")
    });
});

////////////////////Code of Newslatter Subscribe Button///////////////////
const { to, fromTo, set } = gsap

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

document.querySelectorAll('.newsletter-form').forEach(form => {

  let input = form.querySelector('input'),
    button = form.querySelector('button'),
    getVar = variable => getComputedStyle(button).getPropertyValue(variable)

  input.addEventListener('input', e => {
    form.classList.toggle('valid', validateEmail(input.value))
  })

  form.addEventListener('submit', e => {

    e.preventDefault()

    if (!validateEmail(input.value)) {
      input.focus()
      return
    }

    if (!button.classList.contains('active')) {

      button.classList.add('active')

      to(button, {
        keyframes: [{
          '--left-wing-first-x': '50%',
          '--left-wing-first-y': '100%',
          '--right-wing-second-x': '50%',
          '--right-wing-second-y': '100%',
          duration: .2,
          onComplete() {
            set(button, {
              '--left-wing-first-y': '0%',
              '--left-wing-second-x': '40%',
              '--left-wing-second-y': '100%',
              '--left-wing-third-x': '0%',
              '--left-wing-third-y': '100%',
              '--left-body-third-x': '40%',
              '--right-wing-first-x': '50%',
              '--right-wing-first-y': '0%',
              '--right-wing-second-x': '60%',
              '--right-wing-second-y': '100%',
              '--right-wing-third-x': '100%',
              '--right-wing-third-y': '100%',
              '--right-body-third-x': '60%'
            })
          }
        }, {
          '--left-wing-third-x': '20%',
          '--left-wing-third-y': '90%',
          '--left-wing-second-y': '90%',
          '--left-body-third-y': '90%',
          '--right-wing-third-x': '80%',
          '--right-wing-third-y': '90%',
          '--right-body-third-y': '90%',
          '--right-wing-second-y': '90%',
          duration: .2
        }, {
          '--rotate': '50deg',
          '--left-wing-third-y': '95%',
          '--left-wing-third-x': '27%',
          '--right-body-third-x': '45%',
          '--right-wing-second-x': '45%',
          '--right-wing-third-x': '60%',
          '--right-wing-third-y': '83%',
          duration: .25
        }, {
          '--rotate': '60deg',
          '--plane-x': '-8px',
          '--plane-y': '40px',
          duration: .2
        }, {
          '--rotate': '40deg',
          '--plane-x': '45px',
          '--plane-y': '-300px',
          '--plane-opacity': 0,
          duration: .375,
          onComplete() {
            setTimeout(() => {
              button.removeAttribute('style')
              fromTo(button, {
                opacity: 0,
                y: -8
              }, {
                opacity: 1,
                y: 0,
                clearProps: true,
                duration: .3,
                onComplete() {
                  button.classList.remove('active')
                }
              })
            }, 2500)
          }
        }]
      })

      to(button, {
        keyframes: [{
          '--text-opacity': 0,
          '--border-radius': '0px',
          '--left-wing-background': getVar('--primary-dark'),
          '--right-wing-background': getVar('--primary-dark'),
          duration: .1
        }, {
          '--left-wing-background': getVar('--primary'),
          '--right-wing-background': getVar('--primary'),
          duration: .15
        }, {
          '--left-body-background': getVar('--primary-dark'),
          '--right-body-background': getVar('--primary-darkest'),
          duration: .25,
          delay: .1
        }, {
          '--trails-stroke': '171px',
          duration: .22,
          delay: .22
        }, {
          '--success-opacity': 1,
          '--success-x': '0px',
          duration: .2,
          delay: .15
        }, {
          '--success-stroke': '0px',
          duration: .15
        }]
      })

    }

  })

})

////Online Offline toast Js
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
  

  