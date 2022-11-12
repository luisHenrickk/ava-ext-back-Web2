import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { IsPublic } from 'src/shared/decorators';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/shared/enums/role.enum';
import { AvaliacaoService } from './avaliacao.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';

@ApiTags('Avalição')
@Controller('avaliacao')
@UseGuards(RolesGuard)
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}

  @Post()
  @Roles(Role.Admin, Role.Professor)
  create(@Body() createAvaliacaoDto: CreateAvaliacaoDto) {
    return this.avaliacaoService.create(createAvaliacaoDto);
  }

  @Get()
  @IsPublic()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search: string,
  ) {
    return this.avaliacaoService.findAll({ page, limit }, search);
  }

  @Get(':id')
  @IsPublic()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.avaliacaoService.findOne(id);
  }

  @Patch(':id')
  @IsPublic()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAvaliacaoDto: UpdateAvaliacaoDto,
  ) {
    return this.avaliacaoService.update(id, updateAvaliacaoDto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Professor)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.avaliacaoService.remove(id);
  }
}
