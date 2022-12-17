import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { Notification } from "@application/entities/notifications";
import { Content } from "@application/entities/content";
import { CountRecipientNotifications } from "./count-recipient-notifications";

describe('Count recipient notifications', () => {
    it('should be able to count recipient Notifications', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const countRecipientNotifications = new CountRecipientNotifications(notificationsRepository);

        await notificationsRepository.create(
            new Notification({
                content: new Content('notification test'),
                category: 'social',
                recipientId: 'recipient-1'
            })
        );
        await notificationsRepository.create(
            new Notification({
                content: new Content('notification test'),
                category: 'social',
                recipientId: 'recipient-1'
            })
        );
        await notificationsRepository.create(
            new Notification({
                content: new Content('notification test'),
                category: 'social',
                recipientId: 'recipient-2'
            })
        );

        const count = await countRecipientNotifications.execute({
            recipientId: 'recipient-1'
        });

        expect(count).toEqual(2);
    });
});