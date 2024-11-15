import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AlbumDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiProperty()
  artistId: string | null;
}

export class AlbumsResponse {
  @ApiProperty({ default: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed' })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  year: number;

  @ApiProperty()
  artistId: string | null;
}
