import { Module } from '@nestjs/common';
// @ts-ignore
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from './config/database.config';
import {Joao, JoaoSchema} from './programa/joao.model';
import {JoaoModule} from "./programa/joao.module";
@Module({
  imports: [
      JoaoModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/softwarehub'),
    // //MongooseModule.forRootAsync({
    //   useFactory: databaseConfig,
    // // }),
    // MongooseModule.forFeature([{ name: 'Joao', schema: JoaoSchema }]),
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
