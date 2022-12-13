import { Content } from './content'

describe('Notification content', () => {
    it('should be able to create a notification content', () => {
        const content = new Content('Vc recebeu 1 solicitação de amizade');

        expect(content).toBeTruthy();
    });

    it('should not be able to create a notification content with less than 5 chars', () => {
        expect(() => new Content('123')).toThrow();
    });

    it('should not be able to create a notification content more than 124 chars', () => {
        expect(() => new Content('a'.repeat(241))).toThrow();
    });
});