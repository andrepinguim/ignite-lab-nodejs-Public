import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { UnreadNotification } from "./unread-notification";
import { Notification } from "@application/entities/notifications";
import { NotificationNotFound } from "./errors/notification-not-found";
import { makeNotification } from "@test/factories/notification-factory";

describe('Unread Notification', () => {
    it('should be able to unread notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const unreadNotification = new UnreadNotification(notificationsRepository);

        const notification = new Notification(makeNotification({ readAt: new Date()}));

        await notificationsRepository.create(notification);

        await unreadNotification.execute({
            notificationId: notification.id
        });

        expect(notificationsRepository.notifications[0].readAt).toBeNull();
    });

    it('should no be able to unread a non existing notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const unreadNotification = new UnreadNotification(notificationsRepository);

        expect(() => {
            return unreadNotification.execute({
                notificationId: 'fake-notification-id'
            });
        }).rejects.toThrow(NotificationNotFound);
    });
});