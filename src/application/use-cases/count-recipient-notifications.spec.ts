import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { CountRecipientNotifications } from "./count-recipient-notifications";
import { makeNotification } from "@test/factories/notification-factory";

describe('Count recipient notifications', () => {
    it('should be able to count recipient Notifications', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const countRecipientNotifications = new CountRecipientNotifications(notificationsRepository);
        const recipientIdTest: string = 'recipient-1';

        await notificationsRepository.create(makeNotification({ recipientId: recipientIdTest }));
        await notificationsRepository.create(makeNotification({ recipientId: recipientIdTest }));
        await notificationsRepository.create(makeNotification({ recipientId: 'recipient-2' }));

        const { count } = await countRecipientNotifications.execute({ recipientId: recipientIdTest });

        expect(count).toEqual(2);
    });
});