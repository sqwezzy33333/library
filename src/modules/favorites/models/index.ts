
import { ApiProperty } from '@nestjs/swagger';
import { Artist, Track } from '@prisma/client';
import { Album } from 'prisma/prisma-client';
import { ArtistResponse } from '../../artist/models';
import { AlbumsResponse } from '../../album/models';
import { TrackResponse } from '../../track/models';

export interface Favorites {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export class FavoritesResponse implements Favorites{
  @ApiProperty({type: [ArtistResponse]})
  artists: Artist[];

  @ApiProperty({type: [AlbumsResponse]})
  albums: Album[];

  @ApiProperty({type: [TrackResponse]})
  tracks: Track[];
}
