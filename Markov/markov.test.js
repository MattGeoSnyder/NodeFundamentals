let { MarkovMachine } = require('./markov.js');

describe("Initialization of Markov Machine", () => {
    let mm;
    beforeEach(() => {
        mm = new MarkovMachine('the cat in the hat');
    })
    test('Initialize', () => {
        expect(mm instanceof MarkovMachine).toEqual(true);
    });
    test('Make Text', () => {
        expect(typeof mm.makeText()).toEqual('string');
        expect(mm.makeText().split(' ').length).toBeLessThanOrEqual(100);
    })
})