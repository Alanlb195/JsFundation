import { getUUID } from "../../src/plugins";



describe('plugins/get-uuid.pluggin.test.ts', () => {

    test('getuuid should return a string and it have a length of 36', () => {
        const uuid = getUUID();
        expect(typeof uuid).toBe('string');
        expect(uuid.length).toBe(36);
    });

});