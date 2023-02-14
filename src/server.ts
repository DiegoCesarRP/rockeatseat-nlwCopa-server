import Fastify from 'fastify';
import cors from "@fastify/cors";
import { poolRoutes } from './routes/pool';
import { guessesRoutes } from './routes/guess';
import { userRoutes } from './routes/user';
import { gameRoutes } from './routes/game';
import { authRoutes } from './routes/auth';
import jwt from '@fastify/jwt';

async function bootstrap() {
    
    const fastify = Fastify({
        logger: true,
    });

    await fastify.register(cors, {
        origin: "*",
        methods: ['GET', 'POST']
    });

    //Em produção isso precisa ser uma varivale ambiente
    await fastify.register(jwt, {
        secret: 'nlwcopa',
    })

    await fastify.register(poolRoutes);
    await fastify.register(guessesRoutes);
    await fastify.register(userRoutes);
    await fastify.register(gameRoutes);
    await fastify.register(authRoutes);

    await fastify.listen({ port: 3333, host: '0.0.0.0'});
}

bootstrap();