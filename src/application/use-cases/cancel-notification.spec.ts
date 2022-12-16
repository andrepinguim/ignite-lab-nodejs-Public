import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { CancelNotification } from "./cancel-notification";
import { Notification } from "@application/entities/notifications";
import { Content } from "@application/entities/content";
import { NotificationNotFound } from "./errors/notification-not-found";

describe('Cancel Notification', () => {
    it('should be able to cancel notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const cancelNotification = new CancelNotification(notificationsRepository);

        const notification = new Notification({
            content: new Content('notification test'),
            category: 'social',
            recipientId: 'example-notification-id'
        });

        await notificationsRepository.create(notification);

        await cancelNotification.execute({
            notificationId: notification.id
        });

        expect(notificationsRepository.notifications[0].canceledAt).toEqual(expect.any(Date));
    });

    it('should no be able to cancel a non existing notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const cancelNotification = new CancelNotification(notificationsRepository);

        expect(() => {
            return cancelNotification.execute({
                notificationId: 'fake-notification-id'
            });
        }).rejects.toThrow(NotificationNotFound);
    });
});