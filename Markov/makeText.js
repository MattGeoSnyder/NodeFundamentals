let { MarkovMachine } = require('./markov.js');
let fs = require('fs');
let axios = require('axios');

function markovFile(path) {    
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log("Cannot generate text from file");
            prcoess.exit(1);
        }

        let mm = new MarkovMachine(data);
        console.log(mm.makeText());
    });
}

async function markovWeb(url) {
    let res;
    try {
        res = await axios.get(url);
    } catch (error) {
        console.log('Cannot generate text from url');
        process.exit(1);
    }
    let mm = new MarkovMachine(res.data);
    console.log(mm.makeText());
}

if (process.argv[2] === 'file') {
    markovFile(process.argv[3]);
}
else if (process.argv[2] === 'url') {
    markovWeb(process.argv[3]);
} else {
    console.log('Command not recognized');
}


