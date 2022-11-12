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
import { CertificadoService } from './certificado.service';
import { CreateCertificadoDto } from './dto/create-certificado.dto';
import { UpdateCertificadoDto } from './dto/update-certificado.dto';

@ApiTags('Certificado')
@Controller('certificado')
@UseGuards(RolesGuard)
export class CertificadoController {
  constructor(private readonly certificadoService: CertificadoService) {}

  @Post()
  @Roles(Role.Admin, Role.Professor)
  create(@Body() createCertificadoDto: CreateCertificadoDto) {
    return this.certificadoService.create(createCertificadoDto);
  }

  @Get()
  @IsPublic()
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('search') search: string,
  ) {
    return this.certificadoService.findAll({ page, limit }, search);
  }

  @Get(':id')
  @IsPublic()
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.certificadoService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.Admin, Role.Professor)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCertificadoDto: UpdateCertificadoDto,
  ) {
    return this.certificadoService.update(id, updateCertificadoDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.certificadoService.remove(id);
  }
}
