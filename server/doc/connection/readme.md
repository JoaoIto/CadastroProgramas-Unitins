# Connection backend to frontend with database date;

O arquivo principal do app já introduz a conexão localhost a partir de uma url pré definido com o nome do seu banco de dados...

````tsx
import { Module } from '@nestjs/common';
// @ts-ignore
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {ProgramaModule} from "./programa/programa.module";
@Module({
  imports: [
      ProgramaModule,
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

````

---

Depois disso, a partir do esquema que é criado das tabelas, podemos simplesmente especificar o parâmetro a qual a collection ou tabela se refere as operações feitas no console. E assim temos uma chamada na tabela especificamente feita por pasta de cada tipo de tabela, no caso usamos a de programa...

````tsx
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ProgramaDocument = Programa & Document;

@Schema({collection: 'programa'})
export class Programa {
    @Prop({ required: true })
    nomeCompleto: string;

    @Prop({ required: true })
    rg: string;

    @Prop({ required: true })
    cpf: string;

    @Prop({ required: true })
    dataNascimento: Date;

    @Prop({ required: true })
    estadoCivil: string;
}

export const ProgramaSchema = SchemaFactory.createForClass(Programa);
````

A partir disso, também entendemos este model que chamamos dentro de repository que ta a função...

````ts
import { Injectable } from '@nestjs/common';
import {Programa} from "./programa.model";
import {CreateProgramaDto} from "./dto/createjoao.dto";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";

@Injectable()
export class ProgramaRepository {
    constructor(@InjectModel(Programa.name) private catModel: Model<Programa>) {}

    async create(createCatDto: CreateProgramaDto): Promise<Programa> {
        const createdCat = new this.catModel(createCatDto);
        return createdCat.save();
    }

    async findAll(): Promise<Programa[]> {
        return this.catModel.find().exec();
    }
}
````

---
