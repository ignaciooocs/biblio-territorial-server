import { IsString, IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export class CreateRegistroDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  institucion: string;

  @IsString()
  @IsNotEmpty()
  barrio: string;

  @IsEnum(['si', 'talvez', 'no'])
  intencion: string;

  @IsString()
  @IsNotEmpty()
  motivo: string;

  @IsString()
  @IsOptional()
  telefono?: string;
}
