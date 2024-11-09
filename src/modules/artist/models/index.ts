import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}

export class ArtistDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}