import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ModerationService } from './moderation.service';
import { ModerateTextDto } from './dto/moderate-text.dto';

@Controller('moderation')
export class ModerationController {
  constructor(private readonly moderationService: ModerationService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  moderate(@Body() dto: ModerateTextDto) {
    return this.moderationService.moderate(dto.text);
  }
}
