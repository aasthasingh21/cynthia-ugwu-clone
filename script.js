
// locomotive js : gives smooth scrolling : hides/invisible scrollbar
// attach loco scroll css -> attach locomotive scroll min js -> smooth js code from github

// gsap : gsap cdn : copy 1st(orange code then paste in html)
// `` are used to join two elements in js
// scrolltrigger



var timer; // a global variable

// putting smooth scroll for entire website
const scroll = new LocomotiveScroll({
    el: document.querySelector("#container"), // el = element on whom to apply locomotive here(container)
    smooth: true,
});


// moving the circle with the cursor 
function cursorMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function(dets) { // window = the screen, whenever mousemove perform this
        // console.log(dets); // tells where mouse moves
        document.querySelector("#cursor").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`; // wherever mousemoves this circle on the background will move along
    });
}
cursorMouseFollower(); // calling the function


// cursor while moving changes shape(skew 🔶)
function skewCursor() {
 // scale 1 : normal fig, since its circle so x and y = 1 // faster the move, larger the difference and slower move less difference
 // wherever is mouse at initial(becomes the previous value), when moved now that point

 // CLAMP : we define min and max xscale and yscale, to get a particular shape 🔶 
 // (0.8-----1) cannot be less than 0.8 or more than 1, less than 0.8 will be converted to 0.8 and more than 1 to 1

    var xscale = 1;
    var yscale = 1; // default values

    var xpre = 0;
    var ypre = 0; // previous value

    window.addEventListener("mousemove", function(dets) { // function performed on window(screen)
        clearTimeout(timer); // clearing the previous timer if the mouse is moved, if not moved then scales will be created and timeout function will run after 100ms

        xscale = gsap.utils.clamp(0.8, 1.2, xdiff);
        yscale = gsap.utils.clamp(0.8, 1.2, ydiff); // clamping : (range (0.8 - 1), yourvalue(2 0r anything))

        var xdiff = dets.clientX - xpre; 
        var ydiff = dets.clientY - ypre; // the diff is current(new) - previous position
        xpre = dets.clientX;
        ypre = dets.clientY; // now current position becomes previous position, so new position can become current position
    
        cursorMouseFollower(xscale, yscale); // call the cursor function and send xscale and yscale ki value

        // sometimes it takes time for circle to be back in shape, so we define a timeout function as whenever x and y scale = 1, this functionn will run
        timer = setTimeout(function() {
            document.querySelector("#cursor").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`; // xscale=1, yscale=1 : default then run this
        }, 100); // basically getting the circle back

    });
}
skewCursor();


// Animating the navbar and hero section
function firstPageAnime() {
    var tl = gsap.timeline();

    // navbar
    tl.from("#nav", {
        y: "-10",
        opacity: 0,
        duration: 1.5, // 2 sec, 1sec is default
        ease: Expo.easeInOut,
    })

    // hero elements (both headings)
    .to(".boundelm", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2, // 2 sec, 1sec is default
        delay: -1,  // it was taking more time to a little delay so decrease the delay
        stagger: 0.2 // the delay
       
    })

    // hero-footer
    .from("#herofooter", {
        y: "-10",
        opacity: 0, 
        duration: 1.5, // 1.5 sec, 1sec is default
        delay: -1,
        ease: Expo.easeInOut,
    })
}
firstPageAnime();


// animating second page
document.querySelectorAll(".elem") // get the elements
.forEach(function (elem) {     // run forEach loop bz we get an array( 3 elements)

    // to rotate the image : diff = current position - previous position
    var rotate = 0;
    var diffrot = 0;

    // to hide the other image
    elem.addEventListener("mouseleave", function(dets) { 
        gsap.to(elem.querySelector("img"), { // getting the image from each elem and using gsap libaray
            opacity: 0,   // show the image
            ease: Power3,
            duration: 0.5,
        });
    });


    elem.addEventListener("mousemove", function(dets) { 
        // to move the image along the div : (entire dets)clintY - A/B/C(only inside div)
        var diff = dets.clientY - elem.getBoundingClientRect().top; // is the detail for particular div(elem)
        diffrot = dets.clientX - rotate;    // diffrot = cp - pp
        rotate = dets.clientX     // rotate = cp
        // console.log(dets.clientX, dets.clientY); // get position of mouse and replace it with the picture hidden there
        gsap.to(elem.querySelector("img"), { // getting the image from each elem and using gsap libaray
            opacity: 1,   // show the image
            ease: Power3,
            top: diff,   
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5)  // so that image dosent rotate fully
        });
    });
});


