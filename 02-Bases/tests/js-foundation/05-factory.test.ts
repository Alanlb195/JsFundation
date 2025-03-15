import { buildMakePerson } from "../../src/js-foundation/05-factory";
// steps to test: A(arrange) A(act) A(assert)
describe('js-foundation/05-factory', () => {
    const getUUID = () => '1234';
    const getAge = () => 26;

    test('buildMakePerson should return a function', () => {

        // Arrange - already done

        // Act
        const makePerson = buildMakePerson({ getUUID, getAge });

        // Assert
        expect(typeof makePerson).toBe('function');
    });

    test('makePerson should return a person', () => {

        // Arrange - already done

        // Act
        const makePerson = buildMakePerson({ getUUID, getAge });
        const jhonDoe = makePerson({ name: 'Alan Lopez', birthdate: '1998-04-27' });

        // Assert
        expect(jhonDoe).toEqual({
            id: '1234',
            name: 'Alan Lopez',
            birthdate: '1998-04-27',
            age: 26,
        });
    });

});
