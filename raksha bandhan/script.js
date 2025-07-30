//-------------------------------
// Get DOM elements
//-------------------------------
const greetingContainer = document.getElementById('greeting-container');
const animationContainer = document.getElementById('animation-container');
const finalMessageContainer = document.getElementById('final-message-container');
const rakhiScene = document.getElementById('rakhi-scene');
const sisterHands = document.querySelector('.sister-hands');
const rakhiContainer = document.querySelector('.rakhi-container');

//-------------------------------
// Animation timing configuration
//-------------------------------
const ANIMATION_TIMINGS = {
    greetingFade:    600,  // 0.6s
    handsEntry:     1000,  // 1.0s
    rakhiAppear:     800,  // 0.8s
    rakhiBinding:    800,  // 0.8s
    handsExit:       600,  // 0.6s
    finalMessage:    800   // 0.8s
};

//-------------------------------
// State management variables
//-------------------------------
let animationState = 'greeting';
let isAnimating = false;

//-------------------------------
// Initialize the application
//-------------------------------
function initializeApp() {
    console.log('Rakhi Animation App Initialized');
    setupEventListeners();
    preloadAnimations();
}

//-------------------------------
// Setup event listeners for user interaction
//-------------------------------
function setupEventListeners() {
    // Start animation on greeting click
    greetingContainer.addEventListener('click', startAnimation);

    // Start animation on spacebar press
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && animationState === 'greeting') {
            e.preventDefault();
            startAnimation();
        }
    });

    // Restart animation on final message click
    finalMessageContainer.addEventListener('click', restartAnimation);
}

//-------------------------------
// Preload key animations to avoid lag
//-------------------------------
function preloadAnimations() {
    const elementsToPreload = [
        '.sister-hand',
        '.rakhi-thread',
        '.rakhi-center'
    ];

    elementsToPreload.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            el.style.transition = 'none';
            el.offsetHeight; // Trigger reflow
            el.style.transition = '';
        });
    });
}

//-------------------------------
// Main animation sequence
//-------------------------------
async function startAnimation() {
    if (isAnimating) return;
    isAnimating = true;
    animationState = 'animating';

    try {
        await hideGreeting();
        await showAnimationScene();
        await animateHandsEntry();
        await animateRakhiBinding();
        await completeRitual();
        await showFinalMessage();
    } catch (error) {
        console.error('Animation error:', error);
        showFinalMessage();
    } finally {
        isAnimating = false;
        animationState = 'complete';
    }
}

//-------------------------------
// Phase 1: Hide greeting and show animation scene
//-------------------------------
function hideGreeting() {
    return new Promise((resolve) => {
        greetingContainer.style.opacity = '0';
        setTimeout(() => {
            greetingContainer.classList.remove('active');
            greetingContainer.classList.add('hidden');
            resolve();
        }, ANIMATION_TIMINGS.greetingFade);
    });
}

function showAnimationScene() {
    return new Promise((resolve) => {
        animationContainer.classList.remove('hidden');
        animationContainer.classList.add('active');

        // Reveal aarti thali and flowers
        setTimeout(() => {
            document.querySelector('.aarti-thali').style.opacity = '1';
            document.querySelector('.scattered-flowers').style.opacity = '1';
            resolve();
        }, 300);
    });
}

//-------------------------------
// Phase 2: Animate sister's hands entering
//-------------------------------
function animateHandsEntry() {
    return new Promise((resolve) => {
        sisterHands.classList.add('hands-active');

        const leftHand = document.querySelector('.left-hand');
        const rightHand = document.querySelector('.right-hand');

        setTimeout(() => {
            leftHand.style.opacity = '1';
            leftHand.style.transform = 'rotate(25deg) translateY(-10px)';
        }, 200);

        setTimeout(() => {
            rightHand.style.opacity = '1';
            rightHand.style.transform = 'rotate(-15deg) translateY(-10px)';
        }, 500);

        setTimeout(resolve, ANIMATION_TIMINGS.handsEntry);
    });
}

//-------------------------------
// Phase 3: Animate rakhi tying process
//-------------------------------
function animateRakhiBinding() {
    return new Promise((resolve) => {
        // Step 1: Show rakhi thread
        setTimeout(() => {
            rakhiContainer.classList.add('rakhi-appear');
            document.querySelector('.rakhi-thread').style.opacity = '1';
            document.querySelector('.rakhi-thread').style.transform = 'scale(1)';
        }, 0);

        // Step 2: Show rakhi centerpiece and add effects
        setTimeout(() => {
            document.querySelector('.rakhi-center').style.opacity = '1';
            document.querySelector('.rakhi-center').style.transform = 'scale(1)';
            addBindingEffect();
        }, ANIMATION_TIMINGS.rakhiAppear);

        // Step 3: Simulate tying motion
        setTimeout(() => {
            simulateTyingMotion();
        }, 1200);

        setTimeout(resolve, ANIMATION_TIMINGS.rakhiAppear + ANIMATION_TIMINGS.rakhiBinding);
    });
}

//-------------------------------
// Add rakhi binding particles effect
//-------------------------------
function addBindingEffect() {
    const rakhiCenter = document.querySelector('.rakhi-center');

    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: radial-gradient(circle, #ffd700, #a61012);
            border-radius: 50%;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            animation: binding-particle 1s ease-out forwards;
            animation-delay: ${i * 0.1}s;
        `;
        rakhiCenter.appendChild(particle);

        setTimeout(() => {
            if (particle.parentNode) particle.parentNode.removeChild(particle);
        }, 1500);
    }

    // Create binding animation style
    const style = document.createElement('style');
    style.textContent = `
        @keyframes binding-particle {
            0%   { transform: translate(-50%, -50%) scale(0); opacity: 1; }
            50%  { transform: translate(-50%, -50%) scale(1.5); opacity: 0.8; }
            100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

//-------------------------------
// Simulate tying motion with hands
//-------------------------------
function simulateTyingMotion() {
    const leftHand = document.querySelector('.left-hand');
    const rightHand = document.querySelector('.right-hand');

    const tyingSequence = [
        { left: 'rotate(30deg) translateY(-25px)', right: 'rotate(-10deg) translateY(-25px)' },
        { left: 'rotate(20deg) translateY(-20px)', right: 'rotate(-20deg) translateY(-20px)' },
        { left: 'rotate(25deg) translateY(-22px)', right: 'rotate(-15deg) translateY(-22px)' }
    ];

    tyingSequence.forEach((motion, index) => {
        setTimeout(() => {
            leftHand.style.transform = motion.left;
            rightHand.style.transform = motion.right;
        }, index * 200);
    });
}

//-------------------------------
// Phase 4: Blessing and exit hands
//-------------------------------
function completeRitual() {
    return new Promise((resolve) => {
        addBlessingEffect();

        setTimeout(() => {
            const leftHand = document.querySelector('.left-hand');
            const rightHand = document.querySelector('.right-hand');

            leftHand.style.transform = 'rotate(25deg) translateY(50px)';
            leftHand.style.opacity = '0.7';

            rightHand.style.transform = 'rotate(-15deg) translateY(50px)';
            rightHand.style.opacity = '0.7';
        }, 500);

        setTimeout(resolve, ANIMATION_TIMINGS.handsExit);
    });
}

//-------------------------------
// Add glowing blessing light
//-------------------------------
function addBlessingEffect() {
    const scene = document.getElementById('rakhi-scene');

    const blessingLight = document.createElement('div');
    blessingLight.style.cssText = `
        position: absolute;
        width: 200px;
        height: 200px;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        animation: blessing-glow 2s ease-out forwards;
        pointer-events: none;
        z-index: 10;
    `;
    scene.appendChild(blessingLight);

    const style = document.createElement('style');
    style.textContent = `
        @keyframes blessing-glow {
            0%   { transform: translate(-50%, -50%) scale(0); opacity: 0; }
            50%  { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
            100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    setTimeout(() => {
        if (blessingLight.parentNode) blessingLight.parentNode.removeChild(blessingLight);
    }, 2500);
}

//-------------------------------
// Phase 5: Show final celebratory message
//-------------------------------
function showFinalMessage() {
    return new Promise((resolve) => {
        animationContainer.style.opacity = '0';

        setTimeout(() => {
            animationContainer.classList.remove('active');
            animationContainer.classList.add('hidden');

            finalMessageContainer.classList.remove('hidden');
            finalMessageContainer.classList.add('active');

            addCelebrationEffects();
            resolve();
        }, ANIMATION_TIMINGS.finalMessage);
    });
}

//-------------------------------
// Add floating hearts for celebration
//-------------------------------
function addCelebrationEffects() {
    const container = finalMessageContainer;

    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.cssText = `
            position: absolute;
            font-size: 2rem;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-heart 3s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            pointer-events: none;
            z-index: -1;
        `;
        container.appendChild(heart);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-heart {
            0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
            50%      { transform: translateY(-20px) rotate(180deg); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

//-------------------------------
// Restart animation from beginning
//-------------------------------
function restartAnimation() {
    if (isAnimating) return;

    finalMessageContainer.classList.remove('active');
    finalMessageContainer.classList.add('hidden');

    animationContainer.classList.remove('active');
    animationContainer.classList.add('hidden');

    greetingContainer.classList.remove('hidden');
    greetingContainer.classList.add('active');
    greetingContainer.style.opacity = '1';

    resetAnimationElements();

    animationState = 'greeting';
    isAnimating = false;
}

//-------------------------------
// Reset all elements to original state
//-------------------------------
function resetAnimationElements() {
    const sisterHands = document.querySelector('.sister-hands');
    sisterHands.classList.remove('hands-active');

    const hands = document.querySelectorAll('.sister-hand');
    hands.forEach(hand => {
        hand.style.opacity = '0';
        hand.style.transform = '';
    });

    const rakhiContainer = document.querySelector('.rakhi-container');
    rakhiContainer.classList.remove('rakhi-appear');

    const rakhiElements = document.querySelectorAll('.rakhi-thread, .rakhi-center');
    rakhiElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'scale(0)';
    });

    const particles = document.querySelectorAll('[style*="binding-particle"], [style*="float-heart"]');
    particles.forEach(particle => {
        if (particle.parentNode) particle.parentNode.removeChild(particle);
    });
}

//-------------------------------
// Global error handling
//-------------------------------
window.addEventListener('error', (e) => {
    console.error('Application error:', e.error);
    if (animationState !== 'greeting') {
        showFinalMessage();
    }
});

//-------------------------------
// DOM ready initialization
//-------------------------------
document.addEventListener('DOMContentLoaded', initializeApp);

//-------------------------------
// Animation performance optimization
//-------------------------------
function optimizeAnimations() {
    const acceleratedElements = [
        '.sister-hand',
        '.rakhi-container',
        '#greeting-message',
        '#final-message'
    ];

    acceleratedElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.style.willChange = 'transform, opacity';
        });
    });
}
document.addEventListener('DOMContentLoaded', optimizeAnimations);

//-------------------------------
// Export functions for testing
//-------------------------------
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        startAnimation,
        restartAnimation,
        ANIMATION_TIMINGS
    };
}
//-------------------------------
// End of script 