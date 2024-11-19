import { Injectable } from '@nestjs/common';
import { ArtistService } from '../../artist/service/artist.service';
import { TrackService } from '../../track/service/track.service';
import { AlbumService } from '../../album/service/album.service';
import { Artist, Album } from '@prisma/client';
import { TrackResponse } from '../../track/models';
import { ArtistResponse } from '../../artist/models';
import { AlbumsResponse } from '../../album/models';
import { FavoritesResponse } from '../models';

@Injectable()
export class FavoritesService {

  async getAll(): Promise<FavoritesResponse> {
    const isFavWhere = { isFav: true };
    const artists: ArtistResponse[] = await this.artistService.getArtists(isFavWhere);
    const tracks: TrackResponse[] = await this.trackService.getTracks(isFavWhere);
    const albums: AlbumsResponse[] = await this.albumService.getAlbums(isFavWhere);
    return {
      artists,
      tracks,
      albums,
    };
  }

  async isTrack(id: string) {
    return this.trackService.getTrack(id);
  }

  async isAlbum(id: string) {
    return this.albumService.getAlbum(id);
  }

  async isArtist(id: string) {
    return this.artistService.getArtist(id);
  }

  async addTrack(track: TrackResponse) {
    return this.trackService.changeFav(track.id, true);
  }

  async deleteTrack(track: TrackResponse) {
    return this.trackService.changeFav(track.id, false);
  }

  async addAlbum(album: Album) {
    return this.albumService.changeFav(album.id, true);
  }

  async deleteAlbum(album: Album) {
    return this.albumService.changeFav(album.id, false);
  }


  async addArtist(artist: Artist) {
    return this.artistService.changeFav(artist.id, true);
  }

  async deleteArtist(artist: Artist) {
    return this.artistService.changeFav(artist.id, false);

  }

  constructor(
    private artistService: ArtistService,
    private trackService: TrackService,
    private albumService: AlbumService,
  ) {
  }
}
