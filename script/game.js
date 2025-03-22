const gameBoard = document.getElementById("gameBoard");
const resetBtn = document.getElementById("resetBtn");
const scoreDisplay = document.getElementById("score");

let score = 0;
let numbers = [
    { number: 1, id: 1 },
    { number: 2, id: 2 },
    { number: 3, id: 3 },
    { number: 4, id: 4 },
    { number: 5, id: 5 },
    { number: 6, id: 6 },
    { number: 1, id: 1 },
    { number: 2, id: 2 },
    { number: 3, id: 3 },
    { number: 4, id: 4 },
    { number: 5, id: 5 },
    { number: 6, id: 6 }
];

let flippedCards = [];
let matchedCards = [];

// สุ่มการ์ด
function shuffleCards() {
    numbers = numbers.sort(() => Math.random() - 0.5);
}

// สร้างการ์ด
function createCards() {
    gameBoard.innerHTML = ""; // เคลียร์หน้าจอเกมก่อน
    numbers.forEach((card, index) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.setAttribute("data-id", index);
        
        cardElement.addEventListener("click", flipCard);
        
        gameBoard.appendChild(cardElement);
    });
}

// ฟังก์ชันเปิดการ์ด
function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains("flipped")) {
        this.classList.add("flipped");
        this.textContent = numbers[this.getAttribute("data-id")].number;
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

// ตรวจสอบการจับคู่
function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;
    const firstCardIndex = firstCard.getAttribute("data-id");
    const secondCardIndex = secondCard.getAttribute("data-id");

    if (numbers[firstCardIndex].number === numbers[secondCardIndex].number) {
        score += 10;
        matchedCards.push(firstCard, secondCard);
        flippedCards = [];
        scoreDisplay.textContent = score;

        if (matchedCards.length === numbers.length) {
            setTimeout(() => {
                alert("คุณชนะ! คะแนนของคุณ: " + score);
            }, 500);
        }
    } else {
        setTimeout(() => {
            flippedCards.forEach(card => {
                card.classList.remove("flipped");
                card.textContent = ""; // รีเซ็ตข้อความในการ์ด
            });
            flippedCards = [];
        }, 1000);
    }
}

// รีเซ็ตเกม
function resetGame() {
    score = 0;
    flippedCards = [];
    matchedCards = [];
    scoreDisplay.textContent = score;
    shuffleCards();
    createCards();
}

// เริ่มเกม
resetBtn.addEventListener("click", resetGame);

// เริ่มเกมตอนโหลดหน้า
shuffleCards();
createCards();
