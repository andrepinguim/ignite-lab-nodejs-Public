import { Inject, Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServerKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaConsumerService extends ServerKafka implements OnModuleDestroy {
    @Inject(ConfigService)
    public config: ConfigService;

    constructor() {
        super({
            client: {
                clientId: 'notifications',
                brokers: ['distinct-mosquito-8680-us1-kafka.upstash.io:9092'],
                sasl: {
                    mechanism: 'scram-sha-256',
                    username: 'ZGlzdGluY3QtbW9zcXVpdG8tODY4MCRerfq6t2mgEtvO3tQKcZOpdEifNWYGLWs',
                    password: 'PWD-FAKE'
                },
                ssl: true,
            }
        });
    }

    async onModuleDestroy() {
        await this.close();
    }
}