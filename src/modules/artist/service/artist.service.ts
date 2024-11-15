import { Injectable } from '@nestjs/common';
import { generateUid } from '../../../shared/utils';
import { ArtistDto } from '../models';
import { PrismaService } from '../../../prisma/prisma.service';
import { Artist } from '@prisma/client';

@Injectable()
export class ArtistService {

  getArtists() {
    return this.prisma.artist.findMany({
      select: {
        id: true,
        name: true,
        grammy: true,
      },
    });
  }

  deleteArtist(id: string) {
    return this.prisma.artist.delete({ where: { id } });
  }

  editArtist(artist: Artist, artistDto: ArtistDto) {
    artist.grammy = artistDto.grammy;
    artist.name = artistDto.name;
    return this.prisma.artist.update({ where: { id: artist.id }, data: artist });
  }

  async addArtist(artistDto: ArtistDto) {
    const artist: Artist = {
      ...artistDto,
      id: generateUid(),
      isFav: false,
    };
    await this.prisma.artist.create({ data: artist });

    delete artist.isFav;
    return artist;
  }

  getArtist(id: string) {
    return this.prisma.artist.findUnique({ where: { id: id } });
  }

  constructor(private prisma: PrismaService) {
  }

}
