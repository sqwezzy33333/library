import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}

export class ArtistDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
