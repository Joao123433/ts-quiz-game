const header = document.querySelector("#header");
const hr = document.querySelector("hr");
const main = document.querySelector("main");
const divScore = document.querySelector("#div-score");
const form = document.querySelector("form");
const container = document.querySelector("#container");
const span = document.querySelectorAll("#numbers-question");
let questionsArr = [];
let element;
let acertos = 0;
let controlSetInterval;
let iteratortimer = 0;
let iteratorQuestion = 0;
let maxQuestions = 0;
async function fetchQuestions() {
    const response = await fetch(`https://raw.githubusercontent.com/Joao123433/json-data/main/data.json`);
    if (response.ok) {
        return response.json();
    }
    return Promise.reject("Erro inesperado");
}
function randomNumberQuestions() {
    return Math.floor(Math.random() * (10 - 1) + 1);
}
function removeEvent() {
    const divs = document.querySelectorAll(".divs");
    divs.forEach(e => {
        e.removeEventListener("click", checkingChoice);
    });
}
function checkingChoice(ev) {
    const choice = ev.target.textContent;
    if (choice === element[0]["response-correct"]) {
        ev.target.classList.add("correct");
        acertos++;
    }
    else {
        ev.target.classList.add("wrong");
        showCorrrectResponse();
    }
    clearInterval(controlSetInterval);
    removeEvent();
    renderButton();
}
function showCorrrectResponse() {
    document.querySelectorAll(".divs").forEach(e => {
        if (e.textContent === element[0]["response-correct"]) {
            e.classList.add("correct");
        }
    });
}
function setScore() {
    const scores = document.querySelectorAll("#scores");
    scores[0].textContent = `${acertos}`;
    scores[1].textContent = `${maxQuestions}`;
}
function removeHide() {
    header.classList.remove("none");
    hr.classList.remove("none");
    main.classList.remove("score");
    form.classList.remove("none");
    divScore.style.display = "none";
}
function hideElements() {
    header.classList.add("none");
    hr.classList.add("none");
    main.classList.add("score");
    form.classList.add("none");
    divScore.style.display = "flex";
    clearInterval(controlSetInterval);
    setScore();
    document.querySelector("#restart").addEventListener("click", setup);
}
function setup() {
    removeHide();
    getQuestions();
}
function next(ev) {
    ev.preventDefault();
    iteratortimer = 10;
    controlSetInterval = setInterval(timer, 1000);
    if (iteratorQuestion === maxQuestions) {
        hideElements();
        return;
    }
    iteratorQuestion++;
    span[0].textContent = `${iteratorQuestion}`;
    deleteElements();
    renderInfoQuestion();
}
function renderButton() {
    const button = createButton();
    form.append(button);
}
async function getQuestions() {
    try {
        iteratortimer = 10;
        iteratorQuestion = 1;
        acertos = 0;
        controlSetInterval = setInterval(timer, 1000);
        const arrayResults = await fetchQuestions();
        maxQuestions = randomNumberQuestions();
        span[0].textContent = `${iteratorQuestion}`;
        span[1].textContent = `${maxQuestions}`;
        sortQuestions(arrayResults.questions, maxQuestions);
        renderInfoQuestion();
    }
    catch (error) {
        alert(error);
    }
}
function renderInfoQuestion() {
    element = questionsArr.shift();
    const title = createTitle(element[0].title);
    const div1 = createDiv(element[0].response1);
    const div2 = createDiv(element[0].response2);
    const div3 = createDiv(element[0].response3);
    const div4 = createDiv(element[0].response4);
    container.append(title, div1, div2, div3, div4);
}
function sortQuestions(questions, maxQuestions) {
    for (let i = 0; i < maxQuestions; i++) {
        questionsArr.push(questions.splice(Math.floor(Math.random() * (questions.length - 1) + 1), 1));
    }
}
function createTitle(value) {
    const title = document.createElement("h1");
    title.textContent = value;
    title.id = "title";
    return title;
}
function createDiv(value) {
    const div = document.createElement("div");
    div.textContent = value;
    div.classList.add("divs");
    div.addEventListener("click", checkingChoice);
    return div;
}
function createButton() {
    const button = document.createElement("button");
    button.id = "next";
    button.classList.add("next");
    button.textContent = "Próximo";
    button.addEventListener("click", next);
    return button;
}
function timer() {
    document.querySelector("#timer").innerHTML = `${iteratortimer}s`;
    if (iteratortimer === 0) {
        clearInterval(controlSetInterval);
        showCorrrectResponse();
        removeEvent();
        renderButton();
    }
    iteratortimer--;
}
function deleteElements() {
    document.querySelector("#title").remove();
    document.querySelectorAll(".divs").forEach(ele => ele.remove());
    document.querySelector("#next").remove();
}
document.addEventListener("DOMContentLoaded", getQuestions);
