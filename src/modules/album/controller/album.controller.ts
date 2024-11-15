import {
  BadRequestException,
  Body,
  Controller, Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post, Put,
  ValidationPipe,
} from '@nestjs/common';
import { AlbumService } from '../service/album.service';
import { isUUID } from 'class-validator';
import { AlbumDto, AlbumsResponse } from '../models';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('album')
export class AlbumController {

  @Get()
  @ApiOkResponse({ type: [AlbumsResponse] })
  getAlbums() {
    return this.albumService.getAlbums();
  }

  @Post()
  @ApiOkResponse({ type: AlbumsResponse })
  @HttpCode(201)
  async createAlbum(
    @Body(ValidationPipe) createAlbumDto: AlbumDto,
  ) {
    return this.albumService.addAlbum(createAlbumDto);
  }

  @Get(':id')
  @ApiOkResponse({ type: AlbumsResponse })
  async findOne(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const album = await this.albumService.getAlbum(id);
    if (!album) {
      throw new NotFoundException('User not found');
    }
    delete album.isFav;
    return album;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteOne(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const album = await this.albumService.getAlbum(id);
    if (!album) {
      throw new NotFoundException('User not found');
    }
    return this.albumService.deleteAlbum(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: AlbumsResponse })
  async editUser(@Param('id') id: string, @Body(ValidationPipe) body: AlbumDto) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid UUID');
    }
    const album = await this.albumService.getAlbum(id);
    if (!album) {
      throw new NotFoundException('User not found');
    }
    return this.albumService.editAlbum(album, body);
  }

  constructor(private albumService: AlbumService) {
  }
}
