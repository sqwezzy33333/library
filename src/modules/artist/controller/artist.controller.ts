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
import { ArtistDto } from "../models";

@Controller("artist")
export class ArtistController {

  @Get()
  getArtists() {
    return this.artistService.getArtists();
  }

  @Post()
  @HttpCode(201)
  async createArtist(
    @Body(ValidationPipe) createArtistDto: ArtistDto,
  ) {
    return this.artistService.addArtist(createArtistDto);
  }

  @Get(":id")
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