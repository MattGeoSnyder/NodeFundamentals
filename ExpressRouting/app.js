const express = require('express');

const app = express();

class NumError extends Error {
    constructor(msg, status) {
        super();
        this.msg = msg;
        this.status = status;
    }
}

function getNumsFromQS(qs) {
    let args = [...qs.nums.split(',')];
    let nums = args.map((arg) => +arg);

    if (args.length === 0 || !qs.nums) {
        throw new NumError("Must provide query string arugments as ?nums=...", 400);
    }
    nums.forEach((val, ind, arr) => {
        if (isNaN(val)) {
            throw new NumError(`${args[ind]} is not a number`, 400);
        }
    });

    return nums;
}

function calculateMean(nums) {
    return nums.reduce((acc, val, ind, arr) => acc + (val/arr.length), 0);
}

app.get('/mean', (req, res, next) => {  
    try {
        let nums = getNumsFromQS(req.query);
        let value = calculateMean(nums);
        return res.send({operation: 'mean',
                        value});
    } catch (err) {
        return next(err);
    }
})

function calculateMedian(nums) {
    nums = nums.sort()
    if (nums.length % 2 == 0) {
        mid = Math.floor(nums.length/2);
        return (nums[mid] + nums[mid-1])/2;
    } else {
        mid = Math.floor(nums.length/2)
        return nums[mid]
    }
}

app.get('/median', (req,res, next) => {
    try {
        let nums = getNumsFromQS(req.query);
        let value = calculateMedian(nums);
        return res.send({operation: 'median', 
                        value})
    } catch (err) {
        return next(err);
    }
})

function calculateMode(nums) {
    let counts = nums.reduce((a,v,i,arr) => {
        if (!(v in a)) {
            a[v] = 0;
        }
        a[v]++;
        return a;
    }, {});
    let value = Object.entries(counts).reduce((acc, val) => acc[1] < val[1] ? val[0] : acc[0])
    return parseInt(value);
}

app.get('/mode', (req, res, next) => {
    debugger;
    try {
        let nums = getNumsFromQS(req.query);
        let value = calculateMode(nums);
        console.log(value);
        return res.send({operation: 'mode',
                        value})
    } catch(err) {
        return next(err)
    }
})

app.use((err, req, res, next) => {
    return res.status(err.status).send(err.msg);
});

app.listen('3000', () => console.log('App listening on port 3000'));

module.exports = {
    mean: calculateMean,
    median: calculateMedian,
    mode: calculateMode
}