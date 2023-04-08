const NUMBERS_API = 'http://numbersapi.com/';

function getFourFacts(number) {
    let facts = [];

    facts.push(axios.get(`${NUMBERS_API}${number}/math`));
    facts.push(axios.get(`${NUMBERS_API}${number}/trivia`));
    facts.push(axios.get(`${NUMBERS_API}${number}/date`));
    facts.push(axios.get(`${NUMBERS_API}${number}/year`));

    return Promise.all(facts);
}

function appendFact(facts) {
    let content = document.querySelector('#facts');
    for (let fact of facts) {
        content.innerText += fact.data;
        content.appendChild(document.createElement('br'));
    }
}

function appendError() {
    let content = document.querySelector('.facts');
    content.innerText = "There was an issue retrieving your facts";
}

function displayFacts() {
    let facts = getFourFacts(2);

    facts.then((res) => appendFact(res))
        .catch(appendError)
}

window.addEventListener('load', displayFacts);