// Data storage
let jokesData = {
    jokes: [],
    actionCards: [],
    explicit18PlusJokes: []
};
let currentCategory = null;

// Get elements
const categoryScreen = document.getElementById('categoryScreen');
const gameScreen = document.getElementById('gameScreen');
const jokesCategory = document.getElementById('jokesCategory');
const actionCategory = document.getElementById('actionCategory');
const explicit18Category = document.getElementById('explicit18Category');
const backButton = document.getElementById('backButton');
const contentButton = document.getElementById('contentButton');
const contentModal = document.getElementById('contentModal');
const promptModal = document.getElementById('promptModal');
const contentText = document.getElementById('contentText');
const promptText = document.getElementById('promptText');
const reactionButtons = document.getElementById('reactionButtons');
const actionReactionButtons = document.getElementById('actionReactionButtons');
const laughedButton = document.getElementById('laughedButton');
const notFunnyButton = document.getElementById('notFunnyButton');
const actionDoneButton = document.getElementById('actionDoneButton');
const actionSkipButton = document.getElementById('actionSkipButton');
const newContentButton = document.getElementById('newContentButton');
const closeBtn = document.querySelector('.close');
const container = document.querySelector('.container');

// Load jokes from JSON file
async function loadJokes() {
    try {
        const response = await fetch('jokes.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        jokesData = await response.json();
        console.log('Jokes loaded successfully:', jokesData);
    } catch (error) {
        console.error('Error loading jokes:', error);
        alert('Error loading jokes. Please refresh the page.');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadJokes();
});

// Function to get random item from array
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Function to create confetti
function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Category selection
jokesCategory.addEventListener('click', () => {
    currentCategory = 'jokes';
    categoryScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
});

actionCategory.addEventListener('click', () => {
    currentCategory = 'actionCards';
    categoryScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
});

explicit18Category.addEventListener('click', () => {
    currentCategory = 'explicit18PlusJokes';
    categoryScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
});

// Back to categories
backButton.addEventListener('click', () => {
    categoryScreen.classList.remove('hidden');
    gameScreen.classList.add('hidden');
    contentModal.style.display = 'none';
    promptModal.style.display = 'none';
    currentCategory = null;
});

// Show content modal
contentButton.addEventListener('click', () => {
    let content = null;
    
    if (currentCategory === 'jokes' && jokesData.jokes.length > 0) {
        content = getRandomItem(jokesData.jokes);
        reactionButtons.classList.remove('hidden');
        actionReactionButtons.classList.add('hidden');
    } else if (currentCategory === 'actionCards' && jokesData.actionCards.length > 0) {
        content = getRandomItem(jokesData.actionCards);
        actionReactionButtons.classList.remove('hidden');
        reactionButtons.classList.add('hidden');
    } else if (currentCategory === 'explicit18PlusJokes' && jokesData.explicit18PlusJokes.length > 0) {
        content = getRandomItem(jokesData.explicit18PlusJokes);
        reactionButtons.classList.remove('hidden');
        actionReactionButtons.classList.add('hidden');
    }
    
    if (content) {
        contentText.textContent = content;
        contentModal.style.display = 'flex';
    } else {
        alert('No content loaded. Please refresh the page.');
        console.error('Content not available. Current category:', currentCategory, 'Data:', jokesData);
    }
});

// Close modal
closeBtn.addEventListener('click', () => {
    contentModal.style.display = 'none';
    promptModal.style.display = 'none';
});

// Jokes - if laughed
laughedButton.addEventListener('click', () => {
    createConfetti();
    promptText.textContent = "Drink now since you laughed!";
    contentModal.style.display = 'none';
    promptModal.style.display = 'flex';
});

// Jokes - if not funny
notFunnyButton.addEventListener('click', () => {
    promptText.textContent = "Okay, let me try another one which is funny but looks like your humour is broken AF";
    contentModal.style.display = 'none';
    promptModal.style.display = 'flex';
});

// Action Cards - if done
actionDoneButton.addEventListener('click', () => {
    createConfetti();
    promptText.textContent = "Amazing! You nailed it! Time to drink and celebrate! 🎉";
    contentModal.style.display = 'none';
    promptModal.style.display = 'flex';
});

// Action Cards - if skip
actionSkipButton.addEventListener('click', () => {
    promptText.textContent = "No worries! Let me find something even more fun for you!";
    contentModal.style.display = 'none';
    promptModal.style.display = 'flex';
});

// New content
newContentButton.addEventListener('click', () => {
    promptModal.style.display = 'none';
    if (currentCategory === 'jokes') {
        contentText.textContent = getRandomItem(jokesData.jokes);
        reactionButtons.classList.remove('hidden');
        actionReactionButtons.classList.add('hidden');
    } else if (currentCategory === 'explicit18PlusJokes') {
        contentText.textContent = getRandomItem(jokesData.explicit18PlusJokes);
        reactionButtons.classList.remove('hidden');
        actionReactionButtons.classList.add('hidden');
    } else if (currentCategory === 'actionCards') {
        contentText.textContent = getRandomItem(jokesData.actionCards);
        actionReactionButtons.classList.remove('hidden');
        reactionButtons.classList.add('hidden');
    }
    contentModal.style.display = 'flex';
});

// Close modals when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === contentModal) {
        contentModal.style.display = 'none';
    }
    if (event.target === promptModal) {
        promptModal.style.display = 'none';
    }
});