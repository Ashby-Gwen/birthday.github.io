// Function to handle the music playback and hide the overlay
function startGame() {
    const music = document.getElementById('background-music');
    const overlay = document.getElementById('start-overlay');
    
    // 1. Play Music
    if (music) {
        music.play().catch(error => {
            console.error("Music playback failed, likely due to browser policy:", error);
        });
    }

    // 2. Hide Overlay
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.visibility = 'hidden';
    }, 1000); // 1 second matches the CSS transition time

    // 3. Start Animations
    startAnimations();
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

    // Balloon animation duration is now 5s (updated in CSS floatUp)
    setTimeout(() => {
        balloon.remove();
    }, 5000); 
}


// 🎊 Confetti Popper Effect
function createConfetti() {
    const totalConfetti = 50;
    const colors = ['red', 'yellow', 'blue', 'green', 'pink', 'orange'];

    for (let i = 0; i < totalConfetti; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');

        const color = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.backgroundColor = color;
        
        const size = Math.random() * 10 + 5; 
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;

        const isLeft = Math.random() > 0.5;
        confetti.style.left = isLeft ? `${Math.random() * 100}px` : `calc(100% - ${Math.random() * 100}px)`;

        // UPDATED: Faster duration (2s to 5s)
        const duration = Math.random() * 3 + 2; // 2s to 5s
        const delay = Math.random() * 1; // Shorter delay for faster burst
        confetti.style.animation = `fall ${duration}s ease-out ${delay}s forwards`;
        
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%'; 
        } else {
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`; 
        }

        document.body.appendChild(confetti);

        // Clean up confetti
        setTimeout(() => {
            confetti.remove();
        }, (duration + delay) * 1000);
    }
}

// Function to initialize all animations
function startAnimations() {
    // 1. Start the first balloon
    createBalloon();
    
    // 2. Start the confetti burst after a tiny delay
    setTimeout(createConfetti, 100);

    // 3. Loop the balloon creation for a continuous effect
    // Creates a new balloon every 6 seconds (slightly longer than the 5s animation)
    setInterval(createBalloon, 6000); 
}


// --- Event Listener ---
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    if (startButton) {
        // Attach the startGame function to the button click
        startButton.addEventListener('click', startGame);
    } else {
        // Fallback: If no button, just start the animations
        startAnimations();
    }
});
