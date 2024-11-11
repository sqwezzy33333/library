import { ApiProperty } from '@nestjs/swagger';

export interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export class FavoritesResponse implements Favorites{
  @ApiProperty({type: [String]})
  artists: string[];

  @ApiProperty({type: [String]})
  albums: string[];

  @ApiProperty({type: [String]})
  tracks: string[];
}
