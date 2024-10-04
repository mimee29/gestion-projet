import { Injectable, NotFoundException, ParseIntPipe, Body, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Tasks } from './tasks.entity/tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from '../tasks/tasks.entity/tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks)
    private readonly tasksRepository: Repository<Tasks>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Tasks> {
    const taskData: DeepPartial<Tasks> = {
      title: createTaskDto.status,
      description: createTaskDto.description,
      status: createTaskDto.status,
      project: createTaskDto.project ? { id: createTaskDto.project } : undefined,
      assignedTo: createTaskDto.assignedTo ? { id: createTaskDto.assignedTo } : undefined,
    };

    const task = this.tasksRepository.create(taskData);

    return this.tasksRepository.save(task);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Tasks> {
    const task = await this.tasksRepository.preload({
      id: id,
      ...updateTaskDto,
    });

    if (!task) {
      throw new NotFoundException(`Tache introuvable`);
    }

    return this.tasksRepository.save(task);
  }

  findAll(): Promise<Tasks[]> {
    return this.tasksRepository.find({ relations: ['project', 'assignedTo'] });
  }

  findOne(id: number): Promise<Tasks> {
    return this.tasksRepository.findOne({ where: { id }, relations: ['project', 'assignedTo'] });
  }

  

  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
