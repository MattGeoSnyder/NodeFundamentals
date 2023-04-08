const BASE_URL = 'https://deckofcardsapi.com/api/deck';
let deck = {
    async init() {
        let res = await axios.get(`${BASE_URL}/new`);
        this.deckId = res.data.deck_id; 
    },
    async shuffle() {
        await axios.get(`${BASE_URL}/${this.deckId}/shuffle`);
    },
    async drawCard() {
        let res = await axios.get(`${BASE_URL}/${this.deckId}/draw`);
        return res;
    }
}

function createCard(res) {
    console.log(res);
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

window.addEventListener('load', async function() {
    await deck.init();
    await deck.shuffle();
});


function emptyStack() {
    let stack = document.querySelector('#card-stack');
    stack.innerHTML = '';
}

let button = document.querySelector('button');
button.addEventListener('click', async function() {
    try {
        let res = await deck.drawCard()
        createCard(res);        
    } catch (error) {
        emptyStack();
        await deck.shuffle();
        let res = await deck.drawCard();
        createCard(res);
    }
})
