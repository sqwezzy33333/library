import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { Pool } from 'pg';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
new PrismaClient({ adapter });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 4000;

  const options = new DocumentBuilder()
    .setTitle('Library')
    .setDescription('Application')
    .setVersion('1.0')
    .addServer(`http://localhost:${PORT}/`, 'Local environment')
    .addTag('Your API Tag')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(PORT);
}

bootstrap();
