import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RegistroDocument = Registro & Document;

@Schema({ timestamps: true })
export class Registro {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  institucion: string;

  @Prop({ required: true })
  barrio: string;

  @Prop({ required: true, enum: ['si', 'talvez', 'no'] })
  intencion: string;

  @Prop({ required: true })
  motivo: string;

  @Prop({ default: '' })
  telefono: string;

  @Prop({ default: '' })
  ipAddress: string;
}

export const RegistroSchema = SchemaFactory.createForClass(Registro);
