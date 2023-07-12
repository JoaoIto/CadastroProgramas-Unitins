import { Module } from '@nestjs/common';
// @ts-ignore
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {ProgramaModule} from "./programa/programa.module";
@Module({
  imports: [
      ProgramaModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/softwarehub'),
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
