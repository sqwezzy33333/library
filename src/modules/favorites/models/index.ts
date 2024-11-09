import { Track } from "../../track/models";
import { Artist } from "../../artist/models";
import { Album } from "../../album/models";

export interface Favorites {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
