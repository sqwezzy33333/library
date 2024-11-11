import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export class AlbumDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  year: number;
}
