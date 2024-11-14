import { Injectable, NotFoundException } from '@nestjs/common';
import { generateUid } from '../../../shared/utils';
import { Track, TrackDto } from '../models';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class TrackService {

  getTracks() {
    return this.prisma.track.findMany();
  }

  async exist(id: string) {
    return this.prisma.track.findUnique({ where: { id } })
  }

  async existFavorite(id: string) {
    return this.prisma.track_Favorite.findUnique({
      where: { id }
    })
  }

  async deleteTrack(id: string) {
    const existFavTrack = await this.existFavorite(id);

    if(existFavTrack) {
      await this.prisma.track_Favorite.delete({ where: { id } });
    }

    return this.prisma.track.delete({
      where: {
        id,
      },
    });
  }

  editTrack(id: string, trackDto: TrackDto) {
    const newTrack = { ...trackDto, id };

    return this.prisma.track.update({
      data: newTrack,
      where: {
        id
      }
    });
  }

  async getTrack(id: string) {
    const track = await this.prisma.track.findUnique({
      where: { id: id },
    });
    if (!track) {
      return new NotFoundException('No track');
    }
    return track;

  }


  async addTrack(trackDto: TrackDto) {
    const track: Track = {
      artistId: null,
      albumId: null,
      ...trackDto,
      id: generateUid(),
    };
    await this.prisma.track.create({
      data: track,
    });
    return track;
  }

  constructor(private prisma: PrismaService) {
  }
}
