import { Controller, Get, Post, Body, HttpCode, HttpStatus, Req } from '@nestjs/common';
import type { Request } from 'express';
import { RegistroService } from './registro.service';
import { CreateRegistroDto } from './dto/create-registro.dto';

function extractIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return (Array.isArray(forwarded) ? forwarded[0] : forwarded).split(',')[0].trim();
  return req.ip ?? '';
}

@Controller('registros')
export class RegistroController {
  constructor(private readonly registroService: RegistroService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateRegistroDto, @Req() req: Request) {
    return this.registroService.create(dto, extractIp(req));
  }

  @Get()
  findAll() {
    return this.registroService.findAll();
  }
}
