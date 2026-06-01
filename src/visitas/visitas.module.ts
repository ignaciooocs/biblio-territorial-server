import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VisitaCounter, VisitaCounterSchema } from './schemas/visita-counter.schema';
import { VisitasService } from './visitas.service';
import { VisitasController } from './visitas.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VisitaCounter.name, schema: VisitaCounterSchema },
    ]),
  ],
  controllers: [VisitasController],
  providers: [VisitasService],
})
export class VisitasModule {}
