import { IsString, IsNotEmpty, IsEnum, IsOptional, IsEmail, MaxLength } from 'class-validator';

export class CreateInstitucionResponseDto {
  @IsString() @IsNotEmpty() @MaxLength(200)
  nombreInstitucion: string;

  @IsEnum(['universidad', 'municipio', 'junta_vecinos', 'empresa', 'ong', 'otro'])
  tipoInstitucion: string;

  @IsString() @IsNotEmpty() @MaxLength(150)
  representante: string;

  @IsString() @IsNotEmpty() @MaxLength(150)
  cargo: string;

  @IsEmail() @IsOptional()
  email?: string;

  @IsEnum(['si_inmediato', 'si_presupuesto', 'talvez', 'no'])
  financiaria: string;

  @IsEnum(['1-5', '6-10', '11-20', '20+', '']) @IsOptional()
  cupos?: string;

  @IsEnum(['inmediato', 'tres_meses', 'seis_meses', 'piloto_primero', '']) @IsOptional()
  plazo?: string;

  @IsString() @IsOptional() @MaxLength(1000)
  condiciones?: string;
}
