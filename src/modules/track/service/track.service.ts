import { Injectable } from '@nestjs/common';
import { generateUid } from '../../../shared/utils';
import { TrackDto } from '../models';
import { PrismaService } from '../../../prisma/prisma.service';
import { Track } from '@prisma/client';

@Injectable()
export class TrackService {

  async getTracks() {
    return this.prisma.track.findMany();
  }

  async deleteTrack(id: string) {
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
    return this.prisma.track.findUnique({
      where: { id: id },
    });
  }


  async addTrack(trackDto: TrackDto) {
    const track: Track = {
      ...trackDto,
      id: generateUid(),
      isFav: false
    };
    await this.prisma.track.create({
      data: track,

    });
    return track;
  }

  constructor(private prisma: PrismaService) {
  }
}
