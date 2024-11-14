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
} from "@nestjs/common";
import { ArtistService } from "../service/artist.service";
import { isUUID } from "class-validator";
import { ArtistDto, ArtistResponse } from '../models';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller("artist")
export class ArtistController {

  @Get()
  @ApiOkResponse({ type: [ArtistResponse] })
  getArtists() {
    return this.artistService.getArtists();
  }

  @Post()
  @ApiOkResponse({ type: ArtistResponse })
  @HttpCode(201)
  async createArtist(
    @Body(ValidationPipe) createArtistDto: ArtistDto,
  ) {
    return this.artistService.addArtist(createArtistDto);
  }

  @Get(":id")
  @ApiOkResponse({ type: ArtistResponse })
  async findOne(@Param("id") id: string) {
    const artist = this.artistService.isArtist(id);
    if (!isUUID(id)) {
      throw new BadRequestException("Invalid UUID");
    }

    if (!artist) {
      throw new NotFoundException("Artist not found");
    }
    return artist;
  }

  @Delete(":id")
  @HttpCode(204)
  async deleteOne(@Param("id") id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException("Invalid UUID");
    }
    const artist = this.artistService.isArtist(id);
    if (!artist) {
      throw new NotFoundException("Artist not found");
    }
    return this.artistService.deleteArtist(artist);
  }

  @Put(":id")
  @ApiOkResponse({ type: ArtistResponse })
  async editArtist(@Param("id") id: string, @Body(ValidationPipe) body: ArtistDto) {
    if (!isUUID(id)) {
      throw new BadRequestException("Invalid UUID");
    }
    const artist = this.artistService.isArtist(id);
    if (!artist) {
      throw new NotFoundException("Artist not found");
    }
    return this.artistService.editArtist(artist, body);
  }

  constructor(private artistService: ArtistService) {
  }
}
