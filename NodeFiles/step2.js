let fs = require('fs');
let axios = require('axios');

function cat() {
    let path = process.argv[2];
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log(`Erorr reading ${process.argv[2]}:`)
            console.log(err);
            process.exit(1);
        }
        console.log(data);
    })
}

async function webCat() {
    let url = process.argv[2];
    try {
        let res = await axios.get(url);
        console.log(res.data);    
    } catch (error) {
        console.log(`Error fetching ${url}:`);
        console.log(error);
    }
}

if (process.argv[2].slice(0,4) === 'http') {
    webCat()
} else {
    cat()
}