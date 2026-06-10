let currentCarbonResult = null;

// DOM Elements
const form = document.getElementById('carbon-form');
const resultsContainer = document.getElementById('results-container');
const overallScoreEl = document.getElementById('overall-score');
const totalEmissionsEl = document.getElementById('total-emissions');
const breakdownGrid = document.getElementById('breakdown-grid');

const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');

const challengesGrid = document.getElementById('challenges-grid');

// --- Carbon Calculator ---
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const payload = {
        transportation: {
            carDistanceKm: parseFloat(document.getElementById('carDistance').value),
            publicTransportKm: parseFloat(document.getElementById('publicTransport').value),
            flightHours: parseFloat(document.getElementById('flightHours').value),
        },
        energy: {
            electricityKwh: parseFloat(document.getElementById('electricity').value),
            acUsageHours: parseFloat(document.getElementById('acUsage').value),
        },
        food: {
            dietType: document.getElementById('dietType').value,
        },
        waste: {
            wasteGenerationKg: parseFloat(document.getElementById('wasteKg').value),
            recyclingHabit: document.getElementById('recyclingHabit').value,
        }
    };

    try {
        const res = await fetch('/api/carbon/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        const data = await res.json();
        
        if (data.success) {
            currentCarbonResult = data.data;
            renderResults(currentCarbonResult);
        } else {
            alert('Error calculating footprint: ' + data.message);
        }
    } catch (err) {
        console.error(err);
        alert('Failed to connect to the server.');
    }
});

function renderResults(result) {
    resultsContainer.classList.remove('hidden');
    overallScoreEl.innerText = result.overallScore;
    
    // Set circle color based on score
    const circle = document.querySelector('.score-circle');
    let color = 'var(--primary)';
    if (result.overallScore < 40) color = 'var(--danger)';
    else if (result.overallScore < 70) color = 'var(--warning)';
    
    circle.style.background = `conic-gradient(${color} ${result.overallScore}%, transparent 0%)`;
    
    totalEmissionsEl.innerText = `Total: ${result.totalEmissionsKgCO2.toLocaleString()} kg CO2/year`;
    
    // Render breakdown
    breakdownGrid.innerHTML = '';
    for (const [category, data] of Object.entries(result.categories)) {
        const isHighest = category === result.highestEmissionCategory;
        breakdownGrid.innerHTML += `
            <div class="breakdown-item" style="${isHighest ? 'border: 1px solid var(--danger);' : ''}">
                <h3>${category}</h3>
                <div class="value">${data.emissionsKgCO2.toLocaleString()} kg</div>
                <div style="font-size:0.8rem;color:var(--text-muted)">${data.percentage}% of total</div>
            </div>
        `;
    }

    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
}

// --- AI Chat ---
function appendMessage(sender, text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    if (sender === 'assistant') {
        // Parse markdown
        bubble.innerHTML = marked.parse(text);
    } else {
        bubble.innerText = text;
    }
    
    msgDiv.appendChild(bubble);
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;

    appendMessage('user', message);
    chatInput.value = '';

    // Typing indicator
    const typingId = 'typing-' + Date.now();
    const msgDiv = document.createElement('div');
    msgDiv.className = `message assistant`;
    msgDiv.id = typingId;
    msgDiv.innerHTML = `<div class="bubble">...</div>`;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    try {
        const payload = { message };
        if (currentCarbonResult) {
            payload.context = { carbonResult: currentCarbonResult };
        }

        const res = await fetch('/api/ai/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        const data = await res.json();
        
        document.getElementById(typingId).remove();
        
        if (data.success) {
            appendMessage('assistant', data.data);
        } else {
            appendMessage('assistant', "Sorry, I'm having trouble connecting right now.");
        }
    } catch (err) {
        console.error(err);
        document.getElementById(typingId).remove();
        appendMessage('assistant', "Connection error.");
    }
});

// --- Challenges ---
async function fetchChallenges() {
    try {
        const res = await fetch('/api/challenges');
        const data = await res.json();
        if (data.success) {
            renderChallenges(data.data);
        }
    } catch (err) {
        console.error("Failed to load challenges", err);
    }
}

function renderChallenges(challenges) {
    challengesGrid.innerHTML = '';
    challenges.forEach(c => {
        challengesGrid.innerHTML += `
            <div class="challenge-card ${c.completed ? 'completed' : ''}">
                <div class="challenge-header">
                    <span class="badge ${c.difficulty}">${c.difficulty.toUpperCase()}</span>
                    <span class="points">+${c.points} pts</span>
                </div>
                <h3>${c.title}</h3>
                <p>${c.description}</p>
                <button class="btn-complete" onclick="completeChallenge('${c.id}')" ${c.completed ? 'disabled' : ''}>
                    ${c.completed ? 'Completed ✓' : 'Mark Complete'}
                </button>
            </div>
        `;
    });
}

window.completeChallenge = async (id) => {
    try {
        const res = await fetch(`/api/challenges/${id}/complete`, { method: 'POST' });
        const data = await res.json();
        if (data.success) {
            fetchChallenges(); // reload
        }
    } catch (err) {
        console.error(err);
    }
};

// Initial load
fetchChallenges();
