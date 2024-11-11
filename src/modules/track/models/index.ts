import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export interface Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export class TrackDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  artistId: string | null;

  @ApiProperty()
  albumId: string | null;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
