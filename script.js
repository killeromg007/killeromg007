// JavaScript for interactive features can be added here.

// Smooth scrolling for navigation links
window.onloadTurnstileCallback = function () {
  turnstile.render("#example-container", {
    sitekey: "<YOUR_SITE_KEY>",
    callback: function (token) {
      console.log(`Challenge Success ${token}`);
    },
  });
};


document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 60,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.15
});

// Observe all sections
document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
});

class Terminal {
    constructor() {
        this.history = document.querySelector('.command-history');
        this.cursor = document.querySelector('.cursor');
        this.setupTerminal();
    }

    setupTerminal() {
        // Start cursor blinking
        setInterval(() => {
            this.cursor.style.opacity = this.cursor.style.opacity === '0' ? '1' : '0';
        }, 500);

        // Display ASCII art and info immediately
        this.displayInitialContent();
    }

    displayInitialContent() {
        const asciiArt = `░░███╗░░░░███╗░░██████╗░███████╗███████╗░█████╗░██████╗░███████╗██╗░░░██╗███████╗██████╗░
░████║░░░████║░░╚════██╗╚════██║██╔════╝██╔══██╗██╔══██╗██╔════╝██║░░░██║██╔════╝██╔══██╗
██╔██║░░██╔██║░░░░███╔═╝░░░░██╔╝█████╗░░██║░░██║██████╔╝█████╗░░╚██╗░██╔╝█████╗░░██████╔╝
╚═╝██║░░╚═╝██║░░██╔══╝░░░░░██╔╝░██╔══╝░░██║░░██║██╔══██╗██╔══╝░░░╚████╔╝░██╔══╝░░██╔══██╗
███████╗███████╗███████╗░░██╔╝░░██║░░░░░╚█████╔╝██║░░██║███████╗░░╚██╔╝░░███████╗██║░░██║
╚══════╝╚══════╝╚══════╝░░╚═╝░░░╚═╝░░░░░░╚════╝░╚═╝░░╚═╝╚══════╝░░░╚═╝░░░╚══════╝╚═╝░░╚═╝

╔═══════════════════════════════════════════╗
║            個人資訊                        ║
║  愛情狀況：單身                            ║
║  興趣愛好：                                ║
║  最愛動漫：N/A                             ║
║  最愛歌曲：N/A                             ║
║  最愛遊戲：N/A                             ║
╚═══════════════════════════════════════════╝`;

        const outputDiv = document.createElement('div');
        outputDiv.className = 'output';
        outputDiv.innerHTML = `<pre>${asciiArt.split('\n').map((line, index) => `<span class="ascii-line">${line}</span>`).join('\n')}</pre>`;
        
        // Insert before the command line
        const commandLine = document.querySelector('.command-line');
        this.history.insertBefore(outputDiv, commandLine);
    }
}

// Initialize terminal when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen after content is loaded
    window.addEventListener('load', () => {
        const loadingScreen = document.querySelector('.loading-screen');
        const container = document.querySelector('.container');
        
        // Add fade-out class to trigger slow opacity transition
        loadingScreen.classList.add('fade-out');
        
        // Show content with fade-in effect
        setTimeout(() => {
            container.classList.add('content-loaded');
        }, 1500); // Matches the loading screen fade-out time
        
        // Remove loading screen from DOM
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 2000);
    });

    new Terminal();
});
