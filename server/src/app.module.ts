import { Module } from '@nestjs/common';
import {ProgramaModule} from "./programa/programa.module";
import {AppController} from "./app.controller";
import {AppService} from "./app.service";

@Module({
  imports: [ProgramaModule],
  controllers: [],
  providers: []
})
export class AppModule {}
