let fs = require('fs');
let axios = require('axios');

function cat(path) {
    let ret = fs.readFileSync(path, 'utf8')
    return ret;
}

async function webCat(url) {
    try {
        let res = await axios.get(url);
        return res.data;
    } catch (error) {
        console.log(`Error fetching ${url}:`);
        console.log(error.code, error.errno);
        process.exit(1);
    }
}

async function write() {
    let output;
    if (process.argv[4].slice(0,4) === 'http') {
        output = await webCat(process.argv[4]);
    } else {
        output = cat(process.argv[4]);
    }
    fs.writeFile(process.argv[3], output, 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    });

}


if (process.argv[2] === "--out") {
    write();
}
else if (process.argv[2].slice(0,4) === 'http') {
    webCat(process.argv[2])
        .then((res) => console.log(res));
}
else {
    console.log(cat(process.argv[2]));
}