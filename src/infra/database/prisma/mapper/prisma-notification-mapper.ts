import { Notification } from "@application/entities/notifications";

export class prismaNotificationMapper {
    static toPrisma(notification: Notification){
        return {
            id: notification.id,
            category: notification.category,
            content: notification.content.value,
            recipientId: notification.recipientId,
            readAt: notification.readAt,
            createdAt: notification.createdAt,
        }
    }
}