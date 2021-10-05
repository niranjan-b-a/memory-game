const sections = document.querySelector("section");
const playerLiveCount = document.querySelector(".playerLivesCount");

let playerLives = 6;

//Link text
playerLiveCount.textContent = playerLives;

//Generate the data

const getData = () => [
    { imgSrc: "./images/beatles.jpeg", id: 1, name: "beatles" },
    { imgSrc: "./images/blink182.jpeg", id: 2, name: "blink 182" },
    { imgSrc: "./images/fkatwigs.jpeg", id: 3, name: "fka twigs" },
    { imgSrc: "./images/fleetwood.jpeg", id: 4, name: "fleetwood" },
    { imgSrc: "./images/joy-division.jpeg", id: 5, name: "joy division" },
    { imgSrc: "./images/ledzep.jpeg", id: 6, name: "lep zeppelin" },
    { imgSrc: "./images/metallica.jpeg", id: 7, name: "metallica" },
    { imgSrc: "./images/pinkfloyd.jpeg", id: 8, name: "pink floyd" },
    { imgSrc: "./images/beatles.jpeg", id: 9, name: "beatles" },
    { imgSrc: "./images/blink182.jpeg", id: 10, name: "blink 182" },
    { imgSrc: "./images/fkatwigs.jpeg", id: 11, name: "fka twigs" },
    { imgSrc: "./images/fleetwood.jpeg", id: 12, name: "fleetwood" },
    { imgSrc: "./images/joy-division.jpeg", id: 13, name: "joy division" },
    { imgSrc: "./images/ledzep.jpeg", id: 14, name: "lep zeppelin" },
    { imgSrc: "./images/metallica.jpeg", id: 15, name: "metallica" },
    { imgSrc: "./images/pinkfloyd.jpeg", id: 16, name: "pink floyd" },
];

const data = getData();

//Randomize
const randomize = () => {
    const cardData = getData();
    cardData.sort(() => Math.random() - 0.5);
    return cardData;
};

//Card Generator function
const cardGenerator = () => {
    const cardData = randomize();
    //Generate Items(generating 16 cards)
    const cards = document.querySelectorAll(".card");
    cardData.forEach((e) => {
        //Generate HTML
        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement("div");
        card.classList = "card";
        face.classList = "face";
        back.classList = "back";
        //Attach image
        face.src = e.imgSrc;
        card.setAttribute("name", e.name);
        //Attach cards to section
        sections.appendChild(card);
        card.appendChild(face);
        card.appendChild(back);
        card.classList.add("toggleCard");
        setTimeout(() => {
            card.classList.remove("toggleCard");
        }, 5000);

        card.addEventListener("click", (e) => {
            card.classList.toggle("toggleCard");
            checkCards(e);
        });
    });
};

//Check Cards
const checkCards = (e) => {
    const clickedCard = e.target;
    clickedCard.classList.add("flipped");
    const flipperCards = document.querySelectorAll(".flipped");
    const toggleCard = document.querySelectorAll(".toggleCard");
    console.log(clickedCard);
    //Logic
    if (flipperCards.length === 2) {
        if (
            flipperCards[0].getAttribute("name") ===
            flipperCards[1].getAttribute("name")
        ) {
            console.log("match");
            flipperCards.forEach((card) => {
                card.classList.remove("flipped");
                card.style.pointerEvents = "none";
            });
        } else {
            console.log("wrong");
            flipperCards.forEach((card) => {
                card.classList.remove("flipped");
                setTimeout(() => {
                    card.classList.remove("toggleCard");
                }, 1000);
            });
            playerLives--;
            playerLiveCount.textContent = playerLives;
            if (playerLives === 0) {
                restart("try again");
            }
        }
    }
    if (toggleCard.length == 16) {
        restart("You won");
    }
};

//Restart
const restart = (text) => {
    let cardData = randomize();
    let faces = document.querySelectorAll(".face");
    let cards = document.querySelectorAll(".card");
    sections.style.pointerEvents = "none";
    cardData.forEach((item, index) => {
        cards[index].classList.remove("toggleCard");
        //Randomize
        setTimeout(() => {
            cards[index].style.pointerEvents = "all";
            faces[index].src = item.imgSrc;
            cards[index].setAttribute("name", item.imgSrc);
            cards[index].classList.add("toggleCard");
            setTimeout(() => {
                cards[index].classList.remove("toggleCard");
            }, 5000);
            sections.style.pointerEvents = "all";
        }, 1000);
    });

    playerLives = 6;

    playerLiveCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 100);
};

cardGenerator();
