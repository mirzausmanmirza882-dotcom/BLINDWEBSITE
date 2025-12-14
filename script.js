// Initialize text-to-speech
const synth = window.speechSynthesis;

// Speak a message
function speak(message) {
    if(synth.speaking) synth.cancel();
    const utter = new SpeechSynthesisUtterance(message);
    utter.rate = 1;
    synth.speak(utter);
}

// Start audio guide
const startBtn = document.getElementById('startAudio');
startBtn.addEventListener('click', () => {
    startBtn.style.display = 'none'; // hide start button
    speak("Welcome! You can use the microphone button to give commands and the on-screen keyboard to type letters and numbers.");
});

// Keyboard functionality
const keys = document.querySelectorAll('.key-btn');
keys.forEach(key => {
    key.addEventListener('click', () => {
        const value = key.getAttribute('data-value');
        speak(You selected ${value});
    });
});

// Microphone (voice input)
const micBtn = document.getElementById('micBtn');
let recognition;
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
        const spoken = event.results[0][0].transcript.toUpperCase();
        speak(You said ${spoken});
    };

    recognition.onerror = (event) => {
        speak("Sorry, I could not recognize that. Please try again.");
    };
}

micBtn.addEventListener('click', () => {
    if(recognition){
        recognition.start();
        speak("Microphone is on. Please speak now.");
    } else {
        speak("Speech recognition not supported on this browser.");
    }
});
