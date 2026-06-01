import { Controller, Get, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { InstitucionesService } from './instituciones.service';
import { CreateInstitucionResponseDto } from './dto/create-institucion-response.dto';

@Controller('instituciones')
export class InstitucionesController {
  constructor(private readonly service: InstitucionesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateInstitucionResponseDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
