const welcomeScreen = document.getElementById('welcome-screen');
const assessmentScreen = document.getElementById('assessment-screen');
const resultsScreen = document.getElementById('results-screen');
const welcomeForm = document.getElementById('welcome-form');
const questionTitle = document.getElementById('question-title');
const answerOptions = document.getElementById('answer-options');
const nextButton = document.getElementById('next-button');
const questionCounter = document.getElementById('question-counter');
const timerDisplay = document.getElementById('timer');
const fireworksContainer = document.getElementById('fireworks');

let currentQuestion = 0;
let score = 0;
let answers = [];
let startTime;
let timerInterval;

const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

const questions = [
    {
        question: "How familiar are you with the basic concepts of Artificial Intelligence (AI)?",
        options: [
            { text: "I actively use AI tools in my daily work.", points: 4 },
            { text: "I understand AI basics and its potential applications.", points: 2 },
            { text: "I have a general idea but haven't used it.", points: 1 },
            { text: "I have used AI tools for simple tasks.", points: 3 },
            { text: "I have no knowledge of AI.", points: 0 }
        ],
        type: "single"
    },
    {
        question: "Which AI tools or technologies have you used in your work? (Select up to 3)",
        options: [
            { text: "AI-powered marketing tools (e.g., HubSpot, Salesforce Einstein)", points: 3 },
            { text: "Machine learning frameworks (e.g., TensorFlow, PyTorch)", points: 4 },
            { text: "None", points: 0 },
            { text: "AI-based data analysis tools (e.g., Power BI with AI features)", points: 2 },
            { text: "ChatGPT or other generative AI tools", points: 1 }
        ],
        type: "multi",
        maxSelections: 3
    },
    // {
    //     question: "How do you apply AI in your daily work?",
    //     options: [
    //         { text: "I collaborate with AI to create content or design workflows.", points: 3 },
    //         { text: "I apply AI to analyze data or generate insights.", points: 2 },
    //         { text: "I develop AI models or customize AI applications.", points: 4 },
    //         { text: "I do not use AI in my daily work.", points: 0 },
    //         { text: "I use AI for basic tasks, like scheduling or email drafting.", points: 1 }
    //     ],
    //     type: "single"
    // },
    // {
    //     question: "How comfortable are you with creating or modifying AI-powered solutions?",
    //     options: [
    //         { text: "Very comfortable with building AI solutions from scratch", points: 4 },
    //         { text: "Somewhat comfortable with guidance", points: 1 },
    //         { text: "Comfortable with using pre-built solutions", points: 2 },
    //         { text: "Not comfortable at all", points: 0 },
    //         { text: "Comfortable with modifying existing AI tools", points: 3 }
    //     ],
    //     type: "single"
    // },
    // {
    //     question: "What level of AI knowledge do you believe is necessary for your role?",
    //     options: [
    //         { text: "Advanced skills to develop and maintain AI solutions", points: 3 },
    //         { text: "None", points: 0 },
    //         { text: "Intermediate knowledge to apply AI in decision-making", points: 2 },
    //         { text: "Basic understanding to use AI tools effectively", points: 1 },
    //         { text: "Expert-level knowledge for specialized AI applications", points: 4 }
    //     ],
    //     type: "single"
    // },
    // {
    //     question: "Have you been involved in the development or customization of AI models?",
    //     options: [
    //         { text: "Yes, I have developed new models", points: 3 },
    //         { text: "Yes, with guidance from others", points: 1 },
    //         { text: "No", points: 0 },
    //         { text: "Yes, I am actively involved in maintaining and improving AI models", points: 4 },
    //         { text: "Yes, I have modified existing models", points: 2 }
    //     ],
    //     type: "single"
    // },
    // {
    //     question: "How often do you use AI-driven automation tools to enhance productivity?",
    //     options: [
    //         { text: "Always", points: 4 },
    //         { text: "Rarely", points: 1 },
    //         { text: "Often", points: 3 },
    //         { text: "Never", points: 0 },
    //         { text: "Sometimes", points: 2 }
    //     ],
    //     type: "single"
    // },
    // {
    //     question: "What is your approach to learning new AI technologies?",
    //     options: [
    //         { text: "I actively seek out new AI tools and experiment with them.", points: 3 },
    //         { text: "I prefer not to learn about AI technologies.", points: 0 },
    //         { text: "I learn only when necessary for my job.", points: 1 },
    //         { text: "I take courses or read articles to stay updated.", points: 2 },
    //         { text: "I contribute to developing new AI learning resources.", points: 4 }
    //     ],
    //     type: "single"
    // },
    // {
    //     question: "How would you rate your understanding of responsible AI practices (e.g., ethics, bias)?",
    //     options: [
    //         { text: "Good understanding, I consider these in my work", points: 3 },
    //         { text: "No understanding", points: 0 },
    //         { text: "Basic awareness", points: 1 },
    //         { text: "Expert-level understanding, I guide others on responsible AI use", points: 4 },
    //         { text: "Moderate understanding", points: 2 }
    //     ],
    //     type: "single"
    // }
];

function adjustLayout() {
    const screen = document.querySelector('.screen:not(.hidden)');
    if (screen) {
        const screenHeight = screen.offsetHeight;
        const windowHeight = window.innerHeight;
        if (screenHeight > windowHeight) {
            document.body.style.height = 'auto';
            document.body.style.overflow = 'auto';
        } else {
            document.body.style.height = '100vh';
            document.body.style.overflow = 'hidden';
        }
    }
}

// Call this function when the page loads, on resize, and after showing results
window.addEventListener('load', adjustLayout);
window.addEventListener('resize', adjustLayout);


welcomeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    welcomeScreen.classList.add('hidden');
    assessmentScreen.classList.remove('hidden');
    startAssessment();
});

function startAssessment() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
    displayQuestion();
}

function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60).toString().padStart(2, '0');
    const seconds = (elapsedTime % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${seconds}`;
}

function displayQuestion() {
    const question = questions[currentQuestion];
    questionTitle.textContent = question.question;
    questionCounter.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    answerOptions.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('answer-option');
        button.textContent = option.text;
        button.addEventListener('click', () => selectAnswer(index, question.type));
        answerOptions.appendChild(button);
    });

    nextButton.disabled = true;
    setTimeout(adjustLayout, 0);
}

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
    
    fireworksContainer.appendChild(particle);
    
    setTimeout(() => particle.remove(), 1000);
}

function sendResultsToAPI() {
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const role = document.getElementById('role').value;

    const results = {
        fullName: fullName,
        email: email,
        role: role,
        totalScore: score,
        classificationLevel: getClassificationLevel(score),
        timeTaken: timerDisplay.textContent,
        questionResults: questions.map((question, index) => ({
            questionNumber: index + 1,
            question: question.question,
            selectedAnswers: answers[index].map(answerIndex => question.options[answerIndex].text),
            pointsEarned: calculateQuestionPoints(index)
        }))
    };

    fetch('https://posttestserver.dev/p/rlaqn4p0lc57wjhr/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(results)
    })
    .then(response => response.text())  // Changed from response.json()
    .then(data => {
        console.log('API Response:', data);
        // You can add additional handling here if needed
    })
    .catch((error) => console.error('Error:', error));
}

function selectAnswer(index, type) {
    const options = answerOptions.children;
    if (type === 'single') {
        Array.from(options).forEach(option => option.classList.remove('selected'));
        options[index].classList.add('selected');
        nextButton.disabled = false;
    } else if (type === 'multi') {
        options[index].classList.toggle('selected');
        const selectedCount = Array.from(options).filter(option => option.classList.contains('selected')).length;
        nextButton.disabled = selectedCount === 0 || selectedCount > questions[currentQuestion].maxSelections;
    }
}

nextButton.addEventListener('click', () => {
    const selectedOptions = Array.from(answerOptions.children)
        .map((option, index) => option.classList.contains('selected') ? index : -1)
        .filter(index => index !== -1);
    
    answers.push(selectedOptions);
    currentQuestion++;

    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        showResults();
    }
});

function createFirework(x, y) {
    const particleCount = 50 + Math.floor(Math.random() * 50);
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(x, y, color);
    }
}

function startFireworks() {
    function launchFireworks() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight * 0.6;  // Upper 60% of screen
                createFirework(x, y);
            }, i * 200);
        }
    }

    // Launch fireworks immediately and every second for 60 seconds
    launchFireworks();
    const fireworksInterval = setInterval(launchFireworks, 1000);
    setTimeout(() => {
        clearInterval(fireworksInterval);
        fireworksContainer.innerHTML = '';
    }, 60000);  // 60 seconds
}

function showResults() {
    clearInterval(timerInterval);
    assessmentScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    document.body.classList.add('results-shown');

    score = calculateScore();
    const totalPoints = document.getElementById('total-points');
    const classificationLevel = document.getElementById('classification-level');
    const pointsBreakdown = document.getElementById('points-breakdown');
    const timeTaken = document.getElementById('time-taken');

    totalPoints.innerHTML = `<h2>Total Points: ${score}</h2>`;
    classificationLevel.innerHTML = `<h1>${getClassificationLevel(score)}</h1>`;

    const endTime = Date.now();
    const totalSeconds = Math.floor((endTime - startTime) / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    timeTaken.innerHTML = `<h4>Time taken: ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}</h4>`;

    let tableHTML = `
        <table>
            <tr>
                <th>Question</th>
                <th>Points</th>
            </tr>
    `;
    
    questions.forEach((question, index) => {
        const pointsEarned = calculateQuestionPoints(index);
        tableHTML += `
            <tr>
                <td>Q${index + 1}</td>
                <td>${pointsEarned}</td>
            </tr>
        `;
    });
    
    tableHTML += '</table>';
    pointsBreakdown.innerHTML = tableHTML;

    // Start fireworks immediately
    startFireworks();
    sendResultsToAPI();
    
    setTimeout(adjustLayout, 0);
    window.scrollTo(0, 0);
}

function calculateScore() {
    return answers.reduce((total, answer, questionIndex) => {
        return total + calculateQuestionPoints(questionIndex);
    }, 0);
}

function calculateQuestionPoints(questionIndex) {
    const question = questions[questionIndex];
    const selectedAnswers = answers[questionIndex];
    
    if (question.type === 'single') {
        return question.options[selectedAnswers[0]].points;
    } else {
        return selectedAnswers.reduce((total, answerIndex) => {
            return total + question.options[answerIndex].points;
        }, 0);
    }
}

function getClassificationLevel(score) {
    if (score >= 33) return "Level 5: Deeply Specializing";
    if (score >= 25) return "Level 4: Training and Maintaining Models";
    if (score >= 17) return "Level 3: Building";
    if (score >= 9) return "Level 2: Applying";
    return "Level 1: Understanding";
}

// Initialize the first question
displayQuestion();




