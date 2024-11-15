import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavoritesService } from '../service/favorites.service';
import { isUUID } from 'class-validator';
import { ApiOkResponse } from '@nestjs/swagger';
import { FavoritesResponse } from '../models';
import { Artist } from '@prisma/client';

@Controller('favs')
export class FavoritesController {

  @Get()
  @ApiOkResponse({ type: FavoritesResponse })
  getAllFavorites() {
    return this.favoritesService.getAll();
  }

  @Post('track/:id')
  async addTrack(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const track = await this.favoritesService.isTrack(id);
    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }
    await this.favoritesService.addTrack(track);
    return;
  }

  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrack(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const track = await this.favoritesService.isTrack(id);
    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }
    await this.favoritesService.deleteTrack(track);
    return;
  }

  @Post('album/:id')
  async addAlbum(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const album = await this.favoritesService.isAlbum(id);
    if (!album) {
      throw new UnprocessableEntityException('Track not found');
    }
    await this.favoritesService.addAlbum(album);
    return;
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbum(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const album = await this.favoritesService.isAlbum(id);
    if (!album) {
      throw new UnprocessableEntityException('Track not found');
    }
    await this.favoritesService.deleteAlbum(album);
    return;
  }

  @Post('artist/:id')
  async addArtist(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const artist: Artist = await this.favoritesService.isArtist(id);
    if (!artist) {
      throw new UnprocessableEntityException('Track not found');
    }
    await this.favoritesService.addArtist(artist);
    return;
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtist(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const artist: Artist = await this.favoritesService.isArtist(id);
    if (!artist) {
      throw new UnprocessableEntityException('Track not found');
    }
    await this.favoritesService.deleteArtist(artist);
    return;
  }

  constructor(
    private favoritesService: FavoritesService,
  ) {
  }

}
