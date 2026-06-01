import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InstitucionResponseDocument = InstitucionResponse & Document;

@Schema({ timestamps: true })
export class InstitucionResponse {
  @Prop({ required: true })
  nombreInstitucion: string;

  @Prop({ required: true, enum: ['universidad', 'municipio', 'junta_vecinos', 'empresa', 'ong', 'otro'] })
  tipoInstitucion: string;

  @Prop({ required: true })
  representante: string;

  @Prop({ required: true })
  cargo: string;

  @Prop({ default: '' })
  email: string;

  @Prop({ required: true, enum: ['si_inmediato', 'si_presupuesto', 'talvez', 'no'] })
  financiaria: string;

  @Prop({ default: '' })
  cupos: string;

  @Prop({ default: '' })
  plazo: string;

  @Prop({ default: '' })
  condiciones: string;

  @Prop({ default: '' })
  ipAddress: string;
}

export const InstitucionResponseSchema = SchemaFactory.createForClass(InstitucionResponse);
