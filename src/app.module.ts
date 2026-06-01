import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegistroModule } from './registro/registro.module';
import { VisitasModule } from './visitas/visitas.module';
import { ModerationModule } from './moderation/moderation.module';
import { InstitucionesModule } from './instituciones/instituciones.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URL ?? 'mongodb://localhost:27017/red-biblio',
    ),
    RegistroModule,
    VisitasModule,
    ModerationModule,
    InstitucionesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
