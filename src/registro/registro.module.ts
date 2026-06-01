import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Registro, RegistroSchema } from './schemas/registro.schema';
import { RegistroService } from './registro.service';
import { RegistroController } from './registro.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Registro.name, schema: RegistroSchema }]),
  ],
  controllers: [RegistroController],
  providers: [RegistroService],
})
export class RegistroModule {}
