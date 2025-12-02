// Function to start the background music (if using the <audio> tag)
function startMusic() {
    const music = document.getElementById('background-music');
    if (music) {
        // Attempt to play music. Browsers often block autoplay, 
        // so you might need a user interaction (like a button click) to start it.
        music.play().catch(error => {
            console.log("Autoplay blocked. User interaction required:", error);
        });
    }
}

// 🎈 Dynamic Balloon Creation
function createBalloon() {
    const balloon = document.createElement('div');
    balloon.classList.add('balloon');

    // Randomize the starting horizontal position (left to right)
    const randomStart = Math.random() * (window.innerWidth - 100); 
    balloon.style.left = `${randomStart}px`;
    
    // Randomize balloon color for fun
    const colors = ['#ff6b6b', '#ffc371', '#4ecdc4', '#7d94b5'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.backgroundColor = randomColor;

    document.body.appendChild(balloon);

    // Remove the balloon after it has finished its animation (8s floatUp)
    setTimeout(() => {
        balloon.remove();
    }, 8000); 
}


// 🎊 Confetti Popper Effect
function createConfetti() {
    const totalConfetti = 50;
    const colors = ['red', 'yellow', 'blue', 'green', 'pink', 'orange'];

    for (let i = 0; i < totalConfetti; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');

        // Randomly set color and shape
        const color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.backgroundColor = color;
        
        // Random size
        const size = Math.random() * 10 + 5; // 5px to 15px
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;

        // Start position (randomly from left or right side)
        const isLeft = Math.random() > 0.5;
        confetti.style.left = isLeft ? `${Math.random() * 100}px` : `calc(100% - ${Math.random() * 100}px)`;

        // Random animation duration and delay
        const duration = Math.random() * 3 + 4; // 4s to 7s
        const delay = Math.random() * 2; // 0s to 2s
        confetti.style.animation = `fall ${duration}s ease-out ${delay}s forwards`;
        
        // Random shape
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%'; // Circles
        } else {
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`; // Squares
        }

        document.body.appendChild(confetti);

        // Clean up confetti after its animation
        setTimeout(() => {
            confetti.remove();
        }, (duration + delay) * 1000);
    }
}

// --- Initialize Effects ---
document.addEventListener('DOMContentLoaded', () => {
    // 1. Start the first balloon
    createBalloon();
    
    // 2. Start the confetti burst after a small delay
    setTimeout(createConfetti, 500);

    // 3. Loop the balloon creation for a continuous effect
    // Creates a new balloon every 10 seconds
    setInterval(createBalloon, 10000); 
    
    // 4. Try to start the music
    startMusic();
});

// Note on music: To guarantee music playback, you might need 
// to add a "Click to Enter" button on the page, and run startMusic() 
// when the user clicks it.
