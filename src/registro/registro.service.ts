import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Registro, RegistroDocument } from './schemas/registro.schema';
import { CreateRegistroDto } from './dto/create-registro.dto';

@Injectable()
export class RegistroService {
  constructor(
    @InjectModel(Registro.name) private registroModel: Model<RegistroDocument>,
  ) {}

  async create(dto: CreateRegistroDto, ip: string): Promise<RegistroDocument> {
    if (ip) {
      const existing = await this.registroModel.findOne({ ipAddress: ip }).lean();
      if (existing) throw new ConflictException('Ya existe un registro desde esta dirección IP');
    }
    return this.registroModel.create({ ...dto, ipAddress: ip });
  }

  async findAll(): Promise<RegistroDocument[]> {
    return this.registroModel.find().sort({ createdAt: -1 }).exec();
  }

  async count(): Promise<number> {
    return this.registroModel.countDocuments().exec();
  }
}
