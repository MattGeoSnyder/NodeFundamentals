const BASE_URL = 'https://deckofcardsapi.com/api/deck';
let deck;

function newDeck() {
    return axios.get(`${BASE_URL}/new`);
}

function shuffle(res) {
    return axios.get(`${BASE_URL}/${res.data.deck_id}/shuffle`);
}

function drawCard() {
    return deck.then((res) => {
        return newRes = axios.get(`${BASE_URL}/${res.data.deck_id}/draw/`);  
    });
}

function createCard(res) {
    let stack = document.querySelector('#card-stack');
    let card = document.createElement('div');
    let deg = Math.floor(Math.random()*90) - 45;
    let top = Math.floor(Math.random()*50);

    card.style.transform = `rotate(${deg}deg)`;
    card.style.backgroundImage = `url(${res.data.cards[0].image})`;
    card.style.top = `${top}px`
    card.classList.add('card');

    stack.appendChild(card);
}

window.addEventListener('load', () => deck = newDeck().then((res) => shuffle(res)));


function emptyStack() {
    let stack = document.querySelector('#card-stack');
    stack.innerHTML = '';
}

let button = document.querySelector('button');
button.addEventListener('click', () => {
    drawCard().then((res) => createCard(res))
    .catch(() => {
        emptyStack();
        deck = deck.then((res) => shuffle(res));
        deck.then(() => drawCard())
            .then((res) => createCard(res));
    })
})
