import { Kafka } from "kafkajs"
import { randomUUID } from 'node:crypto'

async function bootstrap() {
    const kafka = new Kafka({
        clientId: 'kafka-producer-test',
        brokers: ['distinct-mosquito-8680-us1-kafka.upstash.io:9092'],
        sasl: {
            mechanism: 'scram-sha-256',
            username: 'ZGlzdGluY3QtbW9zcXVpdG8tODY4MCRerfq6t2mgEtvO3tQKcZOpdEifNWYGLWs',
            password: 'FAKE-PWD',
        },
        ssl: true,
    });

    const producer = kafka.producer()

    await producer.connect()
    await producer.send({
        topic: 'notifications.send-notifications',
        messages: [
            {
                value: JSON.stringify({
                    content: 'Nova solicitação de amizade [kafka]',
                    category: 'social',
                    recipientId: randomUUID()
                })
            }
        ]
    })
    await producer.disconnect()
}

bootstrap()