import { Injectable } from "@nestjs/common";
import { db } from "../../../db/db";
import { generateUid } from "../../../shared/utils";
import { Artist, ArtistDto } from "../models";
import { ArtistController } from "../controller/artist.controller";

@Injectable()
export class ArtistService {

  getArtists() {
    return db.artists;
  }

  deleteArtist(artist: Artist) {
    const id = artist.id;
    db.artists.splice(db.artists.indexOf(artist));
    db.tracks.forEach(track => {
      if(track.artistId === id) {
        track.artistId = null;
      }
    })
    db.albums.forEach(album => {
      if(album.artistId === id) {
        album.artistId = null;
      }
    })
    db.favorites.artists = db.favorites.artists.filter(favArtist => favArtist.id !== artist.id);
  }

  editArtist(artist: Artist, artistDto: ArtistDto) {
    artist.grammy = artistDto.grammy;
    artist.name = artistDto.name;
    return artist;
  }

  addArtist(artistDto: ArtistDto) {
    const artist: Artist = {
      ...artistDto,
      id: generateUid(),
    };
    db.artists.push(artist);
    return artist;
  }

  isArtist(id: string) {
    return db.artists.find(x => x.id === id);
  }

}