
import { ApiProperty } from '@nestjs/swagger';
import { ArtistResponse } from '../../artist/models';
import { AlbumsResponse } from '../../album/models';
import { TrackResponse } from '../../track/models';


export class FavoritesResponse {
  @ApiProperty({type: [ArtistResponse]})
  artists: ArtistResponse[];

  @ApiProperty({type: [AlbumsResponse]})
  albums: AlbumsResponse[];

  @ApiProperty({type: [TrackResponse]})
  tracks: TrackResponse[];
}
