import { Content } from './content'
import { Notification } from './notifications'

describe('Notification', () => {
    it('should be able to create a notification', () => {
        const notification = new Notification({
            content: new Content('Nova solicitação de amizade'),
            category: 'social',
            recipientId: 'example-recipient-id'
        });

        expect(notification).toBeTruthy();
    });

    it('should not be able to create a notification content with less than 5 chars', () => {
        expect(() => new Content('123')).toThrow();
    });

    it('should not be able to create a notification content more than 124 chars', () => {
        expect(() => new Content('a'.repeat(241))).toThrow();
    });
});