import { Injectable } from "@nestjs/common";
import { db } from "../../../db/db";
import { Track } from "../../track/models";
import { Album } from "../../album/models";
import { Artist } from "../../artist/models";

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

  addTrack(track: Track) {
    return db.favorites.tracks.push(track);
  }

  deleteTrack(track: Track) {
    const index = db.favorites.tracks.findIndex((element) => element.id === track.id);
    db.favorites.tracks.splice(index, 1);
  }

  addAlbum(album: Album) {
    return db.favorites.albums.push(album);
  }

  deleteAlbum(album: Album) {
    const index = db.favorites.albums.findIndex((element) => element.id === album.id);
    db.favorites.albums.splice(index, 1);
  }

  isArtist(id: string) {
    return db.artists.find((track) => track.id === id);
  }

  addArtist(artist: Artist) {
    return db.favorites.artists.push(artist);
  }

  deleteArtist(artist: Artist) {
    const index = db.favorites.artists.findIndex((element) => element.id === artist.id);
    db.favorites.artists.splice(index, 1);
  }
}