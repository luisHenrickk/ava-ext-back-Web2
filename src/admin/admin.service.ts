import { Admin } from './entities/admin.entity';
import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AdminService {
  constructor(@InjectRepository(Admin) private repository: Repository<Admin>) {}

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const admin: Admin = this.repository.create(createAdminDto);
    admin.role = 'admin';
    const { senha, ...result } = await this.repository.save(admin);
    return result as Admin;
  }
}
