class MarkovMachine {

    /** build markov machine; read in text.*/
  
    constructor(text) {
      let words = text.split(/[ \r\n]+/);
      this.words = words.filter(c => c !== "");
      this.makeChains();
    }
  
    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
  
    makeChains() {
      let chains = {};
      for (let word of this.words) {
        chains[word] = [];
      }

      for (let i = 0; i < this.words.length; i++) {
        chains[this.words[i]].push(this.words[i+1]);
      }

      return chains;
    }
  
  
    /** return random text from chains */
  
    makeText(numWords = 100) {
      let text = [];
      let chains = this.makeChains();
      let key = Object.keys(chains)[0];

      while (key && text.length < numWords) {
        text.push(key);
        let nextInd = Math.floor(Math.random()*chains[key].length);
        key = chains[key][nextInd];
      }
      return text.join(" ");
    }
  }

module.exports.MarkovMachine = MarkovMachine;  