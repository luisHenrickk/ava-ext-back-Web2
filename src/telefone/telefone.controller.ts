import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { TelefoneService } from './telefone.service';
import { CreateTelefoneDto } from './dto/create-telefone.dto';
import { UpdateTelefoneDto } from './dto/update-telefone.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Telefone')
@Controller('telefone')
export class TelefoneController {
  constructor(private readonly telefoneService: TelefoneService) {}

  @Post()
  create(@Body() createTelefoneDto: CreateTelefoneDto) {
    return this.telefoneService.create(createTelefoneDto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search: string,
  ) {
    return this.telefoneService.findAll({ page, limit }, search);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.telefoneService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTelefoneDto: UpdateTelefoneDto,
  ) {
    return this.telefoneService.update(id, updateTelefoneDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.telefoneService.remove(id);
  }
}
