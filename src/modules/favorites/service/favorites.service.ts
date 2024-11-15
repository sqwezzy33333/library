import { Injectable } from "@nestjs/common";
import { Artist, Track } from '@prisma/client';
import { Album } from 'prisma/prisma-client';


@Injectable()
export class FavoritesService {
  getAll() {
  }

  isTrack(id: string) {
  }

  isAlbum(id: string) {
  }

  addTrack(track: Track) {
  }

  deleteTrack(track: Track) {
  }

  addAlbum(album: Album) {
  }

  deleteAlbum(album: Album) {
  }

  isArtist(id: string) {
  }

  addArtist(artist: Artist) {
  }

  deleteArtist(artist: Artist) {

  }
}
