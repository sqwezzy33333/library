import { Injectable } from '@nestjs/common';
import { generateUid } from '../../../shared/utils';
import { AlbumDto } from '../models';
import { PrismaService } from '../../../prisma/prisma.service';
import { Album } from 'prisma/prisma-client';

@Injectable()
export class AlbumService {

  getAlbums() {
    return this.prisma.album.findMany({
      select: {
        id: true,
        name: true,
        year: true,
        artistId: true,
      },
    });
  }

  deleteAlbum(id: string) {
    return this.prisma.album.delete({ where: { id } });
  }

  editAlbum(album: Album, albumDto: AlbumDto) {
    album = { ...album, ...albumDto };
    return this.prisma.album.update({ where: { id: album.id }, data: album });
  }

  addAlbum(albumDto: AlbumDto) {
    const album: Album = {
      artistId: null,
      ...albumDto,
      id: generateUid(),
      isFav: false,
    };
    return this.prisma.album.create({ data: album });
  }

  getAlbum(id: string) {
    return this.prisma.album.findUnique({ where: { id: id } });
  }

  constructor(
    private prisma: PrismaService,
  ) {
  }

}
