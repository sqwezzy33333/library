import { User } from "../modules/user/models";
import { Album } from "../modules/album/models";
import { Artist } from "../modules/artist/models";
import { Favorites } from "../modules/favorites/models";
import { Track } from "../modules/track/models";

class DB {
  users: User[] = [];
  albums: Album[] = [];
  artists: Artist[] = [];
  tracks: Track[] = [];
  favorites: Favorites = {
    tracks: [],
    artists: [],
    albums: []
  };
};

export const db = new DB();