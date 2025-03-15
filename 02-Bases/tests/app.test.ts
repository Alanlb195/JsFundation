
// A A A

describe('App', () => {

    test('should be 30', () => {

        // Arrange

        const num1 = 10;
        const num2 = 20;


        // Act

        const result = num1 + num2;


        // Assert

        expect(result).toBe(30);


        // Dirty process without expect:
        // if (result === 30) {
        // }
        // else {
        //     throw new Error('Error. The result should be 30!');
        // }


    })
})