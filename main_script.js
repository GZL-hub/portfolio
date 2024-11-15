// Dark Mode Feature

const toggleModeButton = document.getElementById('toggle-mode');
const lightModeButton = document.getElementById('light-mode');

// Function to apply the correct mode based on localStorage
function applyMode() {
    const mode = localStorage.getItem('mode');
    if (mode === 'dark') {
        document.body.classList.add('dark-mode');
        toggleModeButton.disabled = true;
        lightModeButton.disabled = false;
        updateIcons('dark');
    } else {
        document.body.classList.remove('dark-mode');
        toggleModeButton.disabled = false;
        lightModeButton.disabled = true;
        updateIcons('light');
    }
}

// Function to update the icons based on the mode
function updateIcons(mode) {
    const toggleIcon = document.querySelector('#toggle-mode i');
    const lightIcon = document.querySelector('#light-mode i');
    if (mode === 'dark') {
        toggleIcon.classList.remove('fa-regular');
        toggleIcon.classList.add('fa-solid');
        lightIcon.classList.remove('fa-solid');
        lightIcon.classList.add('fa-regular');
    } else {
        toggleIcon.classList.remove('fa-solid');
        toggleIcon.classList.add('fa-regular');
        lightIcon.classList.remove('fa-regular');
        lightIcon.classList.add('fa-solid');
    }
}

toggleModeButton.addEventListener('click', () => {
    document.body.classList.add('dark-mode');
    toggleModeButton.disabled = true;
    lightModeButton.disabled = false;
    localStorage.setItem('mode', 'dark');
    updateIcons('dark');
});

lightModeButton.addEventListener('click', () => {
    document.body.classList.remove('dark-mode');
    toggleModeButton.disabled = false;
    lightModeButton.disabled = true;
    localStorage.setItem('mode', 'light');
    updateIcons('light');
});

// Apply the correct mode on page load
document.addEventListener('DOMContentLoaded', applyMode);

let button1Clicked = false;
let button2Clicked = false;

// Add event listeners to the buttons
document.getElementById('toggle-mode').addEventListener('click', function() {
  button1Clicked = true;
  var icon = document.querySelector('#toggle-mode i');
  if (icon.classList.contains('fa-regular')) {
    icon.classList.remove('fa-regular');
    icon.classList.add('fa-solid');
  } else {
    icon.classList.remove('fa-solid');
    icon.classList.add('fa-regular');
  }
  // Reset button 2 to its previous state
  if (button2Clicked) {
    var icon2 = document.querySelector('#light-mode i');
    icon2.classList.remove('fa-solid');
    icon2.classList.add('fa-regular');
    button2Clicked = false;
  }
});

document.getElementById('light-mode').addEventListener('click', function() {
  button2Clicked = true;
  var icon = document.querySelector('#light-mode i');
  if (icon.classList.contains('fa-regular')) {
    icon.classList.remove('fa-regular');
    icon.classList.add('fa-solid');
  } else {
    icon.classList.remove('fa-solid');
    icon.classList.add('fa-regular');
  }
  // Reset button 1 to its previous state
  if (button1Clicked) {
    var icon1 = document.querySelector('#toggle-mode i');
    icon1.classList.remove('fa-solid');
    icon1.classList.add('fa-regular');
    button1Clicked = false;
  }
});

// Add event listeners to the buttons
document.getElementById('toggle-mode').addEventListener('click', function() {
  button1Clicked = true;
  var icon = document.querySelector('#toggle-mode i');
  if (icon.classList.contains('fa-regular')) {
    icon.classList.remove('fa-regular');
    icon.classList.add('fa-solid');
  } else {
    icon.classList.remove('fa-solid');
    icon.classList.add('fa-regular');
  }
  // Reset button 2 to its previous state
  if (button2Clicked) {
    var icon2 = document.querySelector('#light-mode i');
    icon2.classList.remove('fa-solid');
    icon2.classList.add('fa-regular');
    button2Clicked = false;
  }
});

document.getElementById('light-mode').addEventListener('click', function() {
  button2Clicked = true;
  var icon = document.querySelector('#light-mode i');
  if (icon.classList.contains('fa-regular')) {
    icon.classList.remove('fa-regular');
    icon.classList.add('fa-solid');
  } else {
    icon.classList.remove('fa-solid');
    icon.classList.add('fa-regular');
  }
  // Reset button 1 to its previous state
  if (button1Clicked) {
    var icon1 = document.querySelector('#toggle-mode i');
    icon1.classList.remove('fa-solid');
    icon1.classList.add('fa-regular');
    button1Clicked = false;
  }
});


// Particle Effect
const canvas = document.getElementById("canvas1")
const ctx = canvas.getContext('2d');
ctx.filter = 'blur(10px)';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// Get Mouse posiion 

let mouse = {
    x: null,
    y: null,}/*
    radius: (canvas.height/80) * (canvas.width/80)
}


window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
); */

// Create Particle Object

class Particle {
    constructor(x, y, directionX, directionY, size, color ) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    // Method to draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    // Check particle position, check mouse position, move the particle, draw the particle
    update(){
        //check if particle is still within canvas
        if (this.x > canvas.width || this.x <0 ) {
            this.directionX = -this.directionX;
        }  
        if(this.y > canvas.height || this.y <0 ) {
            this.directionY = -this.directionY;
        }

        // Check collision
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
            }
            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
            }
            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10; 
            }
            if(mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
            }
        }
        // move particle
        this.x +=this.directionX
        this.y +=this.directionY
        // draw particle
        this.draw()
    }
}

// Create particle array
function init() {
    particlesArray = [];
    let numberofParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberofParticles; i++) {
        let size = (Math.random() * 3) + 0.5;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 1) - 0.5;
        let directionY = (Math.random() * 1) - 0.5; // Define directionY
        let color = '#b2beb5';
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// Animation loop

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0, innerWidth, innerHeight);

    ctx.filter = 'none'; // Apply blur filter before drawing particles
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    ctx.filter = 'none'; // Remove blur filter before drawing lines
    connect();
} 


// Check if particle are close enough to draw line between them
function connect() {
    // Let's say we only check every other particle to reduce the number of lines
    for (let a = 0; a < particlesArray.length; a+=2) {
        for (let b = a; b < particlesArray.length; b+=2) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) **2)
                + ((particlesArray[a].y - particlesArray[b].y) ** 2);
            if (distance < (canvas.width/7) * (canvas.height/7)) {
                ctx.strokeStyle = "#b2beb5";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}


//Resize window
window.addEventListener('resize', function() {
    canvas.width = innerWidth
    canvas.height = innerHeight
    canvas.style.border = '5px solid black';
    mouse.radius = ((canvas.height/80) * (canvas.width/80))
    init();
})


init();
animate();

// Fade Out Effect
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.navbar a');
    const content = document.getElementById('content');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const href = this.getAttribute('href');

            content.classList.add('fade-out');

            setTimeout(() => {
                window.location.href = href;
            }, 500); // Match the duration of the CSS transition
        });
    });

    var currentUrl = window.location.pathname.split("/").pop();
    if (currentUrl === "") {
        currentUrl = "Personal Portfolio.html"; // Adjust this to match your home page file name
    }

    console.log("Current URL:", currentUrl); // Debugging line

    links.forEach(function(link) {
        console.log("Checking link:", link.getAttribute("href")); // Debugging line
        if (link.getAttribute("href") === currentUrl || (currentUrl === "Personal Portfolio.html" && link.getAttribute("href") === "Personal Portfolio.html")) {
            console.log("Disabling link:", link.getAttribute("href")); // Debugging line
            link.style.pointerEvents = "none";
            link.style.color = "gray"; // Optional: Change the color to indicate it's disabled
        }
    });
});
// Popup Menu
    const menuToggle = document.getElementById('menu-toggle');
    const popupMenu = document.getElementById('popup-menu');

    menuToggle.addEventListener('click', () => {
        if (popupMenu.classList.contains('show')) {
            popupMenu.classList.remove('show');
            setTimeout(() => {
                popupMenu.style.display = 'none';
            }, 500); // Match the duration of the CSS transition
        } else {
            popupMenu.style.display = 'flex';
            setTimeout(() => {
                popupMenu.classList.add('show');
            }, 10); // Small delay to trigger the transition
        }
    });
    // Close the popup menu when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target === popupMenu) {
            popupMenu.classList.remove('show');
            setTimeout(() => {
                popupMenu.style.display = 'none';
            }, 500); // Match the duration of the CSS transition
        }
    });



