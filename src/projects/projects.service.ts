import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Projects } from './projects.entity/projects.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Users } from '../users/users.entity/users.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Projects)
    private readonly projectsRepository: Repository<Projects>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  // 
  async create(createProjectDto: CreateProjectDto): Promise<Projects> {
    const members = await this.usersRepository.findByIds(createProjectDto.members);

    const project = this.projectsRepository.create({
      ...createProjectDto,
      members, 
    });

    return this.projectsRepository.save(project);
  }

  findAll(): Promise<Projects[]> {
    return this.projectsRepository.find({ relations: ['members'] });
  }

  findOne(id: number): Promise<Projects> {
    return this.projectsRepository.findOne({ where: { id }, relations: ['members'] });
  }

  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Projects> {
    
    const project = await this.projectsRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException('Projet introuvable');
    }

    if (updateProjectDto.members) {
      const members = await this.usersRepository.findByIds(updateProjectDto.members);
      project.members = members;
    }

    if (updateProjectDto.name) {
      project.name = updateProjectDto.name;
    }
    if (updateProjectDto.description) {
      project.description = updateProjectDto.description;
    }
    if (updateProjectDto.status) {
      project.status = updateProjectDto.status;
    }

    return this.projectsRepository.save(project);
  }

  async remove(id: number): Promise<void> {
    await this.projectsRepository.delete(id);
  }
}
