const { mean, median, mode } = require('./app.js');

describe("Testing math funcitons", () => {
    let nums;
    beforeEach(() => {
        nums = [1,2,3];
    });
    test("Mean", () => {
        expect(mean(nums)).toEqual(2);
    })
    test("Median", () => {
        let numsEven = [1,2,3,4];
        
        expect(median(nums)).toEqual(2);
        expect(median(numsEven)).toEqual(2.5);
    })
    test("Mode", () => {
        expect(mode(nums)).toEqual(1);
    })
})