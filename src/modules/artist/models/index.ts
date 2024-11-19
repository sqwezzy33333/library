import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

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


export class ArtistResponse {
  @ApiProperty({
    default: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
  })
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: 'boolean' })
  grammy: boolean
}
