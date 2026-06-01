import { Controller, Get, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { RegistroService } from './registro.service';
import { CreateRegistroDto } from './dto/create-registro.dto';

@Controller('registros')
export class RegistroController {
  constructor(private readonly registroService: RegistroService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateRegistroDto) {
    return this.registroService.create(dto);
  }

  @Get()
  findAll() {
    return this.registroService.findAll();
  }
}
