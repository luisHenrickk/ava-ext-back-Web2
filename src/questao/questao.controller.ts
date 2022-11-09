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
} from '@nestjs/common';
import { QuestaoService } from './questao.service';
import { CreateQuestaoDto } from './dto/create-questao.dto';
import { UpdateQuestaoDto } from './dto/update-questao.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Questão')
@Controller('questao')
export class QuestaoController {
  constructor(private readonly questaoService: QuestaoService) {}

  @Post()
  create(@Body() createQuestaoDto: CreateQuestaoDto) {
    return this.questaoService.create(createQuestaoDto);
  }

  @Get()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search: string,
  ) {
    return this.questaoService.findAll({ page, limit }, search);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.questaoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuestaoDto: UpdateQuestaoDto,
  ) {
    return this.questaoService.update(id, updateQuestaoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.questaoService.remove(id);
  }
}
