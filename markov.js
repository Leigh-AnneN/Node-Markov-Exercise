/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    //splits the input text on spacers and line breaks to make an array of words
    let words = text.split(/[ \r\n]+/);
    //removes any empty strings from the array
    this.words = words.filter(c => c !== "");
    //creates the markov chain
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();
    let i = 0;

    for (let word of this.words) {
      if (chains.has(word)) {
        chains.get(word).push(this.words[i + 1]);
      } else {
        chains.set(word, [this.words[i + 1]]);
      }
      i++;
    }
    this.chains = chains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
  
    let keys = Array.from(this.chains.keys());
    let key = keys[Math.floor(Math.random() * keys.length)];
    let text = key;
    let i = 0;
    while (i < numWords) {
      let values = this.chains.get(key);
      let value = values[Math.floor(Math.random() * values.length)];
      if (value === undefined) {
        break;
      }
      text += " " + value;
      key = value;
      i++;
    }
    return text;

  }
}

module.exports = {
  MarkovMachine
};