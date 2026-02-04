let play = document.querySelector(".play");
let loop = document.querySelector(".loop");
let stop = document.querySelector(".stop");
let record = document.querySelector(".record");

let isPlaying = false;
let isLoop = false;
let isRecording = false;
let lastTime = null;

let sequence =[
    {code: allPads[2].getAttribute("data-key"), delay: 1000},
    {code: allPads[0].getAttribute("data-key"), delay: 1000},
    {code: allPads[2].getAttribute("data-key"), delay: 500},
    {code: allPads[2].getAttribute("data-key"), delay: 500},
    {code: allPads[0].getAttribute("data-key"), delay: 1000},
    {code: allPads[2].getAttribute("data-key"), delay: 1000},
    {code: allPads[0].getAttribute("data-key"), delay: 1000},
    {code: allPads[2].getAttribute("data-key"), delay: 500},
    {code: allPads[2].getAttribute("data-key"), delay: 500},
    {code: allPads[0].getAttribute("data-key"), delay: 1000},
];

document.addEventListener("keydown", (e) => {   
    allPads.forEach(element => {
        if (e.keyCode == element.getAttribute("data-key")){
            element.classList.add("sound", "playing");
            playSound(e.keyCode);
            if (isRecording) {
                const now = performance.now();
                const delta = now - lastTime;
                sequence.push({code: element.getAttribute("data-key"), delay: delta});
                lastTime = now;
            };
        };
    });
});

function playSound(keyCode){
    let audios = document.querySelectorAll("audio");
    audios.forEach(e => {
        if (keyCode == e.getAttribute("data-key")){
            e.play();
        };
    });
};

play.addEventListener("click", (e) => {
    isPlaying = true;
    playBeat();
});

loop.addEventListener("click", (e) => {
    isLoop = e.target.checked;
})

stop.addEventListener("click", (e) => {
    stopBeat();
});

record.addEventListener("click", (e) => {
    recordBeat();
});

function simulateKey(keyCode) {
    const event = new KeyboardEvent("keydown", {
        //key,
        //code: `Key${key.toUpperCase()}`,
        keyCode,
        which: keyCode,
        bubbles: true
    });
    document.dispatchEvent(event);
};

async function playBeat(){
    for (i = 0; i < sequence.length; i++){
        if (isPlaying){
            let pad = sequence[i].code;
            let delay = sequence[i].delay;
            await playPad(pad, delay);
        };
    };
    if (isLoop && isPlaying){
        playBeat();
    } else {
        isPlaying = false;
    }

};

function playPad(pad, delay){
    return new Promise((resolve) => {
        setTimeout(() => {
            simulateKey(pad);
            resolve("resolve");
        }, delay);
    });
};

function stopBeat(){
    lastTime = null;
    isPlaying = false;
    isRecording = false;
};

function recordBeat(){
    sequence = [];
    lastTime = performance.now();
    isRecording = true;
};