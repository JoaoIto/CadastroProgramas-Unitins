import { Module } from '@nestjs/common';
// @ts-ignore
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {ProgramaModule} from "./programa/programa.module";
import {UsuarioModule} from "./usuario/usuario.module";
import {UsuarioProgramaModule} from "./usuario-programa/usuario-programa.module";
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from "./roles/roles.guard";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
@Module({
  imports: [
      ProgramaModule,
      UsuarioModule,
      UsuarioProgramaModule,
      AuthModule,
      JwtModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/softwarehub'),
  ],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: RolesGuard,
  }]
})
export class AppModule {}
