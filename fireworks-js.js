const button = document.getElementById('fireworksButton');
const container = document.getElementById('fireworksContainer');
const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

function createParticle(x, y, color) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.backgroundColor = color;
    
    const angle = Math.random() * Math.PI * 2;
    const distance = 50 + Math.random() * 100;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance - 50;  // Bias upwards
    
    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--ty', `${ty}px`);
    
    container.appendChild(particle);
    
    setTimeout(() => particle.remove(), 1000);
}

function createFirework(x, y) {
    const particleCount = 50 + Math.floor(Math.random() * 50);
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(x, y, color);
    }
}

button.addEventListener('click', () => {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight * 0.6;  // Upper 60% of screen
            createFirework(x, y);
        }, i * 200);
    }
});
