let fs = require('fs');

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

cat();