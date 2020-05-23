/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
/*eslint-env browser*/
/*eslint 'no-console':0*/

// code from https://youtu.be/urol_SD1wz4

let toggleNavStatus = false; // navigation is closed as a default

let toggleNav = function(){ //creates an anonymous function
    let getSidebar = document.querySelector('.nav-sidebar');
    let getSidebarUl = document.querySelector('.nav-sidebar ul');
    let getSidebarTitle = document.querySelector('.nav-sidebar span');
    let getSidebarLinks = document.querySelectorAll('.nav-sidebar a');

    if (toggleNavStatus === false){ //checks if the navigation is closed
      getSidebarUl.style.visibility = 'visible'; //changes the css code visibility from hidden to visible
      getSidebar.style.width = '150px'; //changes the css code width to 150 px
      getSidebarTitle.style.opacity = '0.5'; //changes the css code opacity to 0.5

      let arrayLength = getSidebarLinks.length;
      for (let i = 0; i < arrayLength; i++){
          getSidebarLinks[i].style.opacity = '1';
      }

      toggleNavStatus = true;
    } 

    else if (toggleNavStatus === true){ //checks if the navigation is open
        getSidebarUl.style.visibility = 'hidden'; //changes the css code visibility from hidden to visible
        getSidebar.style.width = '0px'; //changes the css code width to 150 px
        getSidebarTitle.style.opacity = '0'; //changes the css code opacity to 0.5
  
        let arrayLength = getSidebarLinks.length;
        for (let i = 0; i < arrayLength; i++){
            getSidebarLinks[i].style.opacity = '0';
        }
  
        toggleNavStatus = false;
      } 
} 

/* test shorter js code

const toggleNav = document.querySelector('.btn-toggle-nav');
const getSidebar = document.querySelector('.nav-sidebar-hidden');

function showSidebar(){
    getSidebar.classList.toggle('nav-sidebar-visible');
}

getSidebar.addEventListener('click', showSidebar);*/