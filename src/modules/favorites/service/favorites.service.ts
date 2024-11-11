import { Injectable } from "@nestjs/common";
import { db } from "../../../db/db";

@Injectable()
export class FavoritesService {
  getAll() {
    return db.favorites;
  }

  isTrack(id: string) {
    return db.tracks.find((track) => track.id === id);
  }

  isAlbum(id: string) {
    return db.albums.find((track) => track.id === id);
  }

  addTrack(track: string) {
    return db.favorites.tracks.push(track);
  }

  deleteTrack(track: string) {
    const index = db.favorites.tracks.indexOf(track);
    db.favorites.tracks.splice(index, 1);
  }

  addAlbum(album: string) {
    return db.favorites.albums.push(album);
  }

  deleteAlbum(album: string) {
    const index = db.favorites.albums.indexOf(album);
    db.favorites.albums.splice(index, 1);
  }

  isArtist(id: string) {
    return db.artists.find((track) => track.id === id);
  }

  addArtist(artist: string) {
    return db.favorites.artists.push(artist);
  }

  deleteArtist(artist: string) {
    const index = db.favorites.artists.indexOf(artist);
    db.favorites.artists.splice(index, 1);
  }
}
