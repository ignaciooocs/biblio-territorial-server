import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Registro, RegistroDocument } from './schemas/registro.schema';
import { CreateRegistroDto } from './dto/create-registro.dto';

@Injectable()
export class RegistroService {
  constructor(
    @InjectModel(Registro.name) private registroModel: Model<RegistroDocument>,
  ) {}

  async create(dto: CreateRegistroDto): Promise<RegistroDocument> {
    const registro = new this.registroModel(dto);
    return registro.save();
  }

  async findAll(): Promise<RegistroDocument[]> {
    return this.registroModel.find().sort({ createdAt: -1 }).exec();
  }

  async count(): Promise<number> {
    return this.registroModel.countDocuments().exec();
  }
}
