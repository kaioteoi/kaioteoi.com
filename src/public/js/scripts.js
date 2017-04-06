'use strict';

var menuButton = document.getElementsByClassName('menu-button')[0];
var mainTitle = document.getElementsByClassName('main-title')[0];

menuButton.addEventListener('click',function() {
  mainTitle.classList.toggle('hidden-text');
});

var path = document.querySelector('.option-1 path');

var length = path.getTotalLength();
// Clear any previous transition
path.style.transition = path.style.WebkitTransition =
  'none';
// Set up the starting positions
path.style.strokeDasharray = length + ' ' + length;
path.style.strokeDashoffset = length;
// Trigger a layout so styles are calculated & the browser
// picks up the starting position before animating
path.getBoundingClientRect();
// Define our transition
path.style.transition = path.style.WebkitTransition =
  'stroke-dashoffset 2s ease-in-out';
// Go!
path.style.strokeDashoffset = '0';
