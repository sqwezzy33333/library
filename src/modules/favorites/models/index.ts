import { TrackResponse } from '../../track/models';
import { ArtistResponse } from '../../artist/models';
import { AlbumsResponse } from '../../album/models';
import { ApiProperty } from '@nestjs/swagger';

export interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export class FavoritesResponse {
  @ApiProperty({ type: [ArtistResponse] })
  artists: ArtistResponse[];

  @ApiProperty({ type: [AlbumsResponse] })
  albums: AlbumsResponse[];

  @ApiProperty({ type: [TrackResponse] })
  tracks: TrackResponse[];
}
