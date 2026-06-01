import { Controller, Get, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { VisitasService } from './visitas.service';

@Controller('visitas')
export class VisitasController {
  constructor(private readonly visitasService: VisitasService) {}

  @Post('increment')
  @HttpCode(HttpStatus.OK)
  async increment() {
    const count = await this.visitasService.increment();
    return { count };
  }

  @Get()
  async getCount() {
    const count = await this.visitasService.getCount();
    return { count };
  }
}
