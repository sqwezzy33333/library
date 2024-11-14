import { Injectable } from "@nestjs/common";
import { db } from "../../../db/db";
import { generateUid } from "../../../shared/utils";
import { Album, AlbumDto } from "../models";

@Injectable()
export class AlbumService {

  getAlbums() {
    return db.albums;
  }

  deleteAlbum(album: Album) {
    db.albums.splice(db.albums.indexOf(album), 1);
    db.tracks.forEach((track) => {
      if (track.albumId === album.id) {
        track.albumId = null;
      }
    });

    db.favorites.albums = db.favorites.albums.filter(favAlbum => favAlbum !== album.id);
  }

  editAlbum(album: Album, albumDto: AlbumDto) {
    album = { artistId: null, ...albumDto, id: album.id };
    return album;
  }

  addAlbum(albumDto: AlbumDto) {
    const album: Album = {
      artistId: null,
      ...albumDto,
      id: generateUid(),
    };
    db.albums.push(album);
    return album;
  }

  isAlbum(id: string) {
    return db.albums.find(x => x.id === id);
  }

}
