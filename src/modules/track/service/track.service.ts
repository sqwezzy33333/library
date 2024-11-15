import { Injectable } from '@nestjs/common';
import { generateUid } from '../../../shared/utils';
import { TrackDto, TrackResponse } from '../models';
import { PrismaService } from '../../../prisma/prisma.service';
import { Track } from '@prisma/client';

@Injectable()
export class TrackService {

  async getTracks(where = {}) {
    const tracks = await this.prisma.track.findMany({ where });
    return tracks.map(this.pipeTrack);
  }

  async deleteTrack(id: string) {
    return this.prisma.track.delete({
      where: {
        id,
      },
    });
  }

  changeFav(id: string, value: boolean) {
    return this.prisma.track.update({
      where: { id },
      data: {
        isFav: value,
      },
    });
  }

  pipeTrack = (track: Track): TrackResponse | null => {
    if (!track) {
      return null;
    }
    delete track.isFav;
    return track;
  };

  async editTrack(id: string, trackDto: TrackDto) {
    const newTrack = { ...trackDto, id };

    const track: Track = await this.prisma.track.update({
      data: newTrack,
      where: {
        id,
      },
    });
    return this.pipeTrack(track);
  }

  async getTrack(id: string) {
    const track: Track = await this.prisma.track.findUnique({
      where: { id: id },
    });
    return this.pipeTrack(track);
  }


  async addTrack(trackDto: TrackDto) {
    const track: Track = {
      ...trackDto,
      id: generateUid(),
      isFav: false,
    };
    await this.prisma.track.create({
      data: track,

    });
    return track;
  }

  constructor(private prisma: PrismaService) {
  }
}
