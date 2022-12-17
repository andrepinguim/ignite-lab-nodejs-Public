import { Notification, NotificationProps } from "@application/entities/notifications";
import { Content } from "@application/entities/content";

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}): Notification {
    return new Notification({
        content: new Content('notification test'),
        category: 'social',
        recipientId: 'recipient-2',
        ...override
    });
}