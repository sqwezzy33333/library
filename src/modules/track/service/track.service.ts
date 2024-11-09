import { Injectable } from "@nestjs/common";
import { db } from "../../../db/db";
import { generateUid } from "../../../shared/utils";
import { Track, TrackDto } from "../models";

@Injectable()
export class TrackService {

  getTracks() {
    return db.users;
  }

  deleteTrack(track: Track) {
    db.tracks.splice(db.tracks.indexOf(track), 1);
    db.favorites.tracks = db.favorites.tracks.filter(favTrack => favTrack.id !== track.id);
  }

  editTrack(track: Track, trackDto: TrackDto) {
    track = { ...trackDto, id: track.id };
    return track
  }

  addTrack(trackDto: TrackDto) {
    const track: Track = {
      artistId: null,
      albumId: null,
      ...trackDto,
      id: generateUid(),
    };
    db.tracks.push(track);
    return track;
  }

  isTrack(id: string) {
    return db.tracks.find(x => x.id === id);
  }

}