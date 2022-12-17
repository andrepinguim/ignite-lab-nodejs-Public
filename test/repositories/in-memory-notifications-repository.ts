import { NotificationsRepository } from "@application/repositories/notifications-repository";
import { Notification } from "@application/entities/notifications";
import { NotificationNotFound } from "@application/use-cases/errors/notification-not-found";

export class InMemoryNotificationsRepository implements NotificationsRepository {
    public notifications: Notification[] = [];

    async findById(notificationId: string): Promise<Notification | null> {
        const notification = this.notifications.find((item) => item.id === notificationId);

        if(!notification){
            throw new NotificationNotFound();
        }

        return (!notification)
            ? null
            : notification;
    }
    
    async countManyByRecipientId(recipientId: string): Promise<number> {
        return this.notifications
            .filter((item) => item.recipientId === recipientId)
            .length;
    }

    async create(notification: Notification) {
        this.notifications.push(notification);
    }
    
    async save(notification: Notification): Promise<void> {
        const notificationIndex = this.notifications.findIndex((item) => item.id === notification.id);

        if (notificationIndex >= 0) {
            this.notifications[notificationIndex] = notification;
        }
    }
};
