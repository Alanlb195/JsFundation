import { getAge } from "../../src/plugins";

describe('plugins/get-age.pluggin.ts', () => {

    test('getAge should return an error if birthdate is not provided', () => {
        const age = getAge('');
        expect( age ).toBeInstanceOf(Error);
    });


    test('getAge should return the age of the person', () => {
        const birthdate = '1998-04-27';
        const age = getAge(birthdate);

        expect( typeof age).toBe('number');
    });


    test('getAge should return current age', () => {
        const birthdate = '1998-04-27';
        const age = getAge(birthdate);

        const calculatedAge = new Date().getFullYear() - new Date(birthdate).getFullYear();

        expect( age ).toBe(calculatedAge);
    
    });


    test('getAge should return 0 years', () => {
        const spy = jest.spyOn(Date.prototype, "getFullYear").mockReturnValue(1998);
        const birthdate = '1998-04-27';
        const age = getAge(birthdate);

        expect( age ).toBe(0);
        expect(spy).toHaveBeenCalled();
        // console.log({ age });
    })
});