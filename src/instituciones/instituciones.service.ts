import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InstitucionResponse, InstitucionResponseDocument } from './schemas/institucion-response.schema';
import { CreateInstitucionResponseDto } from './dto/create-institucion-response.dto';

@Injectable()
export class InstitucionesService {
  constructor(
    @InjectModel(InstitucionResponse.name)
    private readonly model: Model<InstitucionResponseDocument>,
  ) {}

  async create(dto: CreateInstitucionResponseDto, ip: string): Promise<InstitucionResponse> {
    if (ip) {
      const existing = await this.model.findOne({ ipAddress: ip }).lean();
      if (existing) throw new ConflictException('Ya existe una evaluación desde esta dirección IP');
    }
    return this.model.create({ ...dto, ipAddress: ip });
  }

  findAll(): Promise<InstitucionResponse[]> {
    return this.model.find().sort({ createdAt: -1 }).lean().exec();
  }
}
