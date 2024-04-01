let body = document.querySelector("body");

let speakButton = document.createElement("button");
speakButton.setAttribute("id", "speak-button");


let speechRecognition = new webkitSpeechRecognition();
speechRecognition.continuous = true;
speechRecognition.interimResults = true;
speechRecognition.lang = "en-us";


let transcript = "";
speechRecognition.onresult = (e) => {
    transcript = "";
    for (let i = 0; i < e.results.length; ++i) {
        transcript += e.results[i][0].transcript;
    }
}

document.addEventListener("keypress", (e) => {
    if (e.shiftKey && e.code === 'Digit8') {
        e.preventDefault();
        speakButton.click();
    }
})

speakButton.addEventListener("click", () => {
    if (!speakButton.hasAttribute("listening")) {
        speakButton.setAttribute("listening", true);
        speechRecognition.start();
    }
    else {
        speakButton.removeAttribute("listening");
        speechRecognition.stop();
        Swal.fire({
            title: "Here's what you said:",
            text: transcript
        });
    }
})

body.appendChild(speakButton);


