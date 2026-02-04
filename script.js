let pad = document.querySelector(".pad");

let pads = [
    {letter: "Z", dataKey: 90, soundName: "hithat"},
    {letter: "E", dataKey: 69, soundName: "kick"},
    {letter: "Q", dataKey: 81, soundName: "openhat"},
    {letter: "S", dataKey: 83, soundName: "boom"},
    {letter: "D", dataKey: 68, soundName: "ride"},
    {letter: "W", dataKey: 87, soundName: "snare"},
    {letter: "X", dataKey: 88, soundName: "tom"},
    {letter: "C", dataKey: 67, soundName: "tink"}
]

function generatePads(){
    pads.forEach(e => {
        let element = addToDiv(
            document.createElement("div"),
            e
        );

        element.appendChild(createKbd(e))
        element.appendChild(createSpan(e));
        
        pad.appendChild(element);
    });
};

function addToDiv(element, e){
    element.setAttribute("data-key", e.dataKey);
    element.classList.add("key");
    return element;
}

function createKbd(e){
    let kb = document.createElement("kbd");
    kb.innerText = e.letter;
    return kb;
}

function createSpan(e){
    let span = document.createElement("span");
    span.innerText = e.soundName;
    span.classList.add("sound");
    return span;
}

generatePads();

let allPads = document.querySelectorAll(".key");

allPads.forEach(e => {
    e.addEventListener("transitionend", () => {
        removeTransition(e);
    });
});

function removeTransition(element){
    element.classList.remove("sound", "playing");
};