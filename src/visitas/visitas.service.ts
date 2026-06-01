import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VisitaCounter, VisitaCounterDocument } from './schemas/visita-counter.schema';

@Injectable()
export class VisitasService {
  constructor(
    @InjectModel(VisitaCounter.name)
    private visitaCounterModel: Model<VisitaCounterDocument>,
  ) {}

  async increment(): Promise<number> {
    const doc = await this.visitaCounterModel.findOneAndUpdate(
      { key: 'main' },
      { $inc: { count: 1 } },
      { new: true, upsert: true },
    );
    return doc.count;
  }

  async getCount(): Promise<number> {
    const doc = await this.visitaCounterModel.findOne({ key: 'main' });
    return doc?.count ?? 0;
  }
}
