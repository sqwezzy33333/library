import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export interface Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export class TrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  artistId: string | null;
  albumId: string | null;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}