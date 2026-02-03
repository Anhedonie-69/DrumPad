let play = document.querySelector(".play");
let stop = document.querySelector(".stop");
let record = document.querySelector(".record");
let isPlaying = false;
let isRecording = false;

play.addEventListener("click", (e) => {
    playBeat();
});

stop.addEventListener("click", (e) => {
    stopBeat();
});

record.addEventListener("click", (e) => {
    recordBeat();
});

function simulateKey(key, keyCode) {
    const event = new KeyboardEvent("keydown", {
        key,
        code: `Key${key.toUpperCase()}`,
        keyCode,
        which: keyCode,
        bubbles: true
    });
    document.dispatchEvent(event);
};

function playBeat(){
    console.log("Play");
};

function stopBeat(){
    console.log("Stop");
};

function recordBeat(){
    console.log("Record");
};