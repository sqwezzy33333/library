import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export interface Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export class TrackResponse {
  @ApiProperty({
    default: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
  })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ nullable: true })
  artistId: string | null;

  @ApiProperty({ nullable: true })
  albumId: string | null;

  @ApiProperty()
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
