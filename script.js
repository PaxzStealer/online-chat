const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

const apiKey = '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'; // Vervang dit door je eigen API-sleutel

sendButton.addEventListener('click', sendMessage);

function sendMessage() {
    const userMessage = userInput.value;
    if (userMessage.trim() === '') return;

    displayMessage('You', userMessage);

    fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            messages: [{ role: 'user', content: userMessage }]
        })
    })
    .then(response => response.json())
    .then(data => {
        const aiMessage = data.choices[0].message.content;
        displayMessage('AI', aiMessage);
    })
    .catch(error => console.error('Error:', error));

    userInput.value = '';
}

function displayMessage(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatLog.appendChild(messageDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
}
