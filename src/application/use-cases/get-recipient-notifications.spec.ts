import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { makeNotification } from "@test/factories/notification-factory";
import { GetRecipientNotifications } from "./get-recipient-notifications";

describe('Get recipient notifications', () => {
    it('should be able to get recipient Notifications', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const countRecipientNotifications = new GetRecipientNotifications(notificationsRepository);
        const recipientIdTest: string = 'recipient-1';

        await notificationsRepository.create(makeNotification({ recipientId: recipientIdTest }));
        await notificationsRepository.create(makeNotification({ recipientId: recipientIdTest }));
        await notificationsRepository.create(makeNotification({ recipientId: 'recipient-2' }));

        const { notifications } = await countRecipientNotifications.execute({ recipientId: recipientIdTest });

        expect(notifications).toHaveLength(2);
        expect(notifications).toEqual(
            expect.arrayContaining(
                [
                    expect.objectContaining({recipientId: recipientIdTest}),
                    expect.objectContaining({recipientId: recipientIdTest})
                ]
            )
        );
    });
});