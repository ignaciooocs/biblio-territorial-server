import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VisitaCounterDocument = VisitaCounter & Document;

@Schema()
export class VisitaCounter {
  @Prop({ default: 'main' })
  key: string;

  @Prop({ default: 0 })
  count: number;
}

export const VisitaCounterSchema = SchemaFactory.createForClass(VisitaCounter);
