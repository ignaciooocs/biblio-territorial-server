import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InstitucionesController } from './instituciones.controller';
import { InstitucionesService } from './instituciones.service';
import { InstitucionResponse, InstitucionResponseSchema } from './schemas/institucion-response.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InstitucionResponse.name, schema: InstitucionResponseSchema },
    ]),
  ],
  controllers: [InstitucionesController],
  providers: [InstitucionesService],
})
export class InstitucionesModule {}
