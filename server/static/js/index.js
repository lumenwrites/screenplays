import './vendor/popper.min.js';
import './vendor/bootstrap.min.js';
import './vendor/mousetrap.min.js';

$( document ).ready(function() {
    console.log( "Heyya!!" );

    /* Turn on dark interface */
    if (localStorage.getItem("darkInterface")) {
	var headID = document.getElementsByTagName("head")[0];
	var cssNode = document.createElement('link');
	cssNode.type = 'text/css';
	cssNode.rel = 'stylesheet';
	cssNode.href = '/static/styles/css/dark.css';
	cssNode.media = 'screen';
	headID.appendChild(cssNode);
    }
    
});

/* Maintain scroll position */
window.onscroll = function() {
    /* Save scroll posiion on scroll */
    localStorage.setItem("scroll-" + window.location.pathname, document.documentElement.scrollTop)
}
$(document).ready(function() {
    /* Load scroll position if it's saved in local storage */
    var scroll = localStorage.getItem("scroll-" + window.location.pathname)
    if (scroll) {
	document.documentElement.scrollTop = scroll
	console.log('Set scroll ' + scroll)
    }
});

/* Hotkeys */

/* Fullscreen mode  */
function toggleFullScreen(){
    if ((document.fullScreenElement && document.fullScreenElement !== null) ||    
	(!document.mozFullScreen && !document.webkitIsFullScreen)) {
	/* Enter fullscreen */
	document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
	console.log("Enter full screen")
    } else {
	/* Exit fullscreen */
	document.webkitCancelFullScreen()
	console.log("Exit full screen")
    }
}

Mousetrap.bind('f', function(e) {
    /* Remember scroll position */
    var scrollPosition = document.documentElement.scrollTop    
    toggleFullScreen();
    /* Reset scroll position */
    setTimeout(()=>{
	document.documentElement.scrollTop = scrollPosition
    },10)
})

/* Dark interface */
function toggleDarkInterface() {
    if (localStorage.getItem("darkInterface")) {
	/* Remove dark style */
	localStorage.removeItem("darkInterface");
	$("link[href='/static/styles/css/dark.css']").remove();
    } else {
	localStorage.setItem("darkInterface", true);
	/* Add link to the style to head */
	var headID = document.getElementsByTagName("head")[0];
	var cssNode = document.createElement('link');
	cssNode.type = 'text/css';
	cssNode.rel = 'stylesheet';
	cssNode.href = '/static/styles/css/dark.css';
	cssNode.media = 'screen';
	headID.appendChild(cssNode);
    }
}
Mousetrap.bind('d', function(e) {
    toggleDarkInterface();
});
$( "#toggleDarkInterface" ).click(function() {
    toggleDarkInterface();
})
/* Autoscroll */
function pageScroll(speed) {
    window.scrollBy(0,1);
    scroll = setTimeout(function(){pageScroll(speed);},speed);
}

Mousetrap.bind('s', function(e) {
    pageScroll(10);
});

Mousetrap.bind('w', function(e) {
    window.clearTimeout(scroll);
});

/* Clear all timeouts */
Mousetrap.bind('q', function(e) {
    // Set a fake timeout to get the highest timeout id
    var highestTimeoutId = setTimeout(";");
    for (var i = 0 ; i < highestTimeoutId ; i++) {
	clearTimeout(i); 
    }
});

