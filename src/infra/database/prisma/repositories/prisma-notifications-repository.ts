import { Injectable } from "@nestjs/common";
import { Notification } from "@application/entities/notifications";
import { NotificationsRepository } from "@application/repositories/notifications-repository";
import { PrismaService } from "../prisma.service";
import { prismaNotificationMapper } from "../mapper/prisma-notification-mapper";

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
    constructor(private prisma: PrismaService) { }
    async findById(notificationId: string): Promise<Notification | null> {
        const notification = await this.prisma.notification.findUnique({
            where: {
                id: notificationId
            }
        });

        if (!notification) {
            return null;
        }

        return prismaNotificationMapper.toDomain(notification);
    }

    async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
        const notifications = await this.prisma.notification.findMany({
            where: {
                recipientId
            }
        });

        return notifications.map(prismaNotificationMapper.toDomain);
    }

    async countManyByRecipientId(recipientId: string): Promise<number> {
        const count = await this.prisma.notification.count({
            where: {
                recipientId
            }
        });

        return count;
    }

    async create(notification: Notification): Promise<void> {
        const raw = prismaNotificationMapper.toPrisma(notification);

        await this.prisma.notification.create({
            data: raw
        });
    }

    async save(notification: Notification): Promise<void> {
        const raw = prismaNotificationMapper.toPrisma(notification);

        await this.prisma.notification.update({
            where: {
                id: raw.id
            },
            data: raw
        });
    }
}