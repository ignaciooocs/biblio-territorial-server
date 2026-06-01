import { Controller, Get, Post, Body, HttpCode, HttpStatus, Req } from '@nestjs/common';
import type { Request } from 'express';
import { InstitucionesService } from './instituciones.service';
import { CreateInstitucionResponseDto } from './dto/create-institucion-response.dto';

function extractIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return (Array.isArray(forwarded) ? forwarded[0] : forwarded).split(',')[0].trim();
  return req.ip ?? '';
}

@Controller('instituciones')
export class InstitucionesController {
  constructor(private readonly service: InstitucionesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateInstitucionResponseDto, @Req() req: Request) {
    return this.service.create(dto, extractIp(req));
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
