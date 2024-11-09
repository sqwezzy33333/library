import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

export class AlbumDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;
}