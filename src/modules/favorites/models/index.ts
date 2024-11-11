import { Track, TrackResponse } from '../../track/models';
import { Artist, ArtistResponse } from '../../artist/models';
import { Album, AlbumsResponse } from '../../album/models';
import { ApiProperty } from '@nestjs/swagger';

export interface Favorites {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}


export class FavoritesResponse implements Favorites{
  @ApiProperty({type: [ArtistResponse]})
  artists: ArtistResponse[];

  @ApiProperty({type: [AlbumsResponse]})
  albums: AlbumsResponse[];

  @ApiProperty({type: [TrackResponse]})
  tracks: TrackResponse[];
}
