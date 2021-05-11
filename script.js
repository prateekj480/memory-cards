const addNewCardBtn = document.getElementById("add-new-card");
const questionContainer = document.getElementById("question-container");
const addCardBtn = document.getElementById("add-card");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const cardContainer = document.getElementById("card-container")
const clearBtn = document.getElementById("clear");
const cardInfo = document.getElementById("card-info");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");


addNewCardBtn.addEventListener("click", () => {
    questionEl.value = "";
    answerEl.value = "";
    questionContainer.classList.add("show");
})
addCardBtn.addEventListener("click", createCard)
cardContainer.addEventListener("click", flipCard)
clearBtn.addEventListener("click", () => {
    if (cardContainer.children.length) {
        cardContainer.innerHTML = "";
        cardInfo.innerHTML = "";
        deleteFromLocal();
    }
})
nextBtn.addEventListener("click", nextCard);
prevBtn.addEventListener("click", prevCard);
window.addEventListener("load", getFromLocal);

let cardArray = [];
function createCard() {
    if (questionEl.value.trim() !== "" && answerEl.value.trim() !== "") {
        const card = document.createElement("div");
        card.className = cardContainer.children.length ? "card" : "card active";
        card.innerHTML = `<div class="inner-card">
            <div class="inner-card-front">
                <p class="question">${questionEl.value}</p>
            </div>
            <div class="inner-card-back">
                <p class="answer">${answerEl.value}</p>
            </div>
        </div>`
        cardContainer.appendChild(card);
        displayCardInfo();
        questionContainer.classList.remove("show");
        const cardItem = {
            class: card.className,
            question: questionEl.value,
            answer: answerEl.value
        }
        saveToLocal(cardItem);
    }
}

function saveToLocal(cardItem) {
    if (localStorage.getItem("cards") === null) {
        cardArray = [];
    } else {
        cardArray = JSON.parse(localStorage.getItem("cards"));
    }
    cardArray.push(cardItem);
    localStorage.setItem("cards", JSON.stringify(cardArray))
}

function deleteFromLocal() {
    cardArray = [];
    localStorage.setItem("cards", JSON.stringify(cardArray))
}

function getFromLocal() {
    if (localStorage.getItem("cards") === null) {
        cardArray = [];
    } else {
        cardArray = JSON.parse(localStorage.getItem("cards"));
    }
    cardArray.forEach(card => {
        const newCard = document.createElement("div");
        newCard.className = card.class;
        newCard.innerHTML = `<div class="inner-card">
            <div class="inner-card-front">
                <p class="question">${card.question}</p>
            </div>
            <div class="inner-card-back">
                <p class="answer">${card.answer}</p>
            </div>
        </div>`
        cardContainer.appendChild(newCard);
        displayCardInfo();
    })
}

function flipCard() {
    if (cardContainer.children.length) {
        document.querySelector(".active").classList.toggle("show-answer");
    }
}

function nextCard() {
    if (document.querySelector(".active") !== null && document.querySelector(".active").nextElementSibling !== null) {
        const activeCard = document.querySelector(".active");
        const nextCard = activeCard.nextElementSibling;
        activeCard.className = "card left";
        nextCard.className = "card active";
        displayCardInfo();
    }
}

function prevCard() {
    if (document.querySelector(".active") !== null && document.querySelector(".active").previousElementSibling !== null) {
        const activeCard = document.querySelector(".active");
        const prevCard = activeCard.previousElementSibling;
        activeCard.className = "card";
        prevCard.className = "card active";
        displayCardInfo();
    }
}

function displayCardInfo() {
    const activeCard = document.querySelector(".active");
    const index = [...cardContainer.children].indexOf(activeCard);
    cardInfo.innerText = `${index + 1}/${cardContainer.children.length}`
}

