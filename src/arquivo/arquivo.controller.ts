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
import { ArquivoService } from './arquivo.service';
import { CreateArquivoDto } from './dto/create-arquivo.dto';
import { UpdateArquivoDto } from './dto/update-arquivo.dto';

@ApiTags('Arquivo')
@Controller('arquivo')
@UseGuards(RolesGuard)
export class ArquivoController {
  constructor(private readonly arquivoService: ArquivoService) {}

  @Post()
  @Roles(Role.Admin, Role.Professor)
  create(@Body() createArquivoDto: CreateArquivoDto) {
    return this.arquivoService.create(createArquivoDto);
  }

  @Get()
  @IsPublic()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search: string,
  ) {
    return this.arquivoService.findAll({ page, limit }, search);
  }

  @Get(':id')
  @IsPublic()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.arquivoService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Professor)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArquivoDto: UpdateArquivoDto,
  ) {
    return this.arquivoService.update(id, updateArquivoDto);
  }

  @Delete(':id')
  @Roles(Role.Admin, Role.Professor)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.arquivoService.remove(id);
  }
}
