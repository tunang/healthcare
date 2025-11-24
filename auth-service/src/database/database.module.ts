import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
    imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'auth.sqlite', // This file will be created
      entities: [join   (__dirname, '..', '**', '*.entity.{ts,js}')],
      migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
      synchronize: false, // <-- This is what you want
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
