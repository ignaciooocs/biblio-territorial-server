import { Injectable } from '@nestjs/common';
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

  create(dto: CreateInstitucionResponseDto): Promise<InstitucionResponse> {
    return this.model.create(dto);
  }

  findAll(): Promise<InstitucionResponse[]> {
    return this.model.find().sort({ createdAt: -1 }).lean().exec();
  }
}
