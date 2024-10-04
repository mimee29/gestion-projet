import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { Tasks } from './tasks.entity/tasks.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@ApiTags('Tâches')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle tâche' })
  @ApiResponse({
    status: 201, description: 'La tâche a été créée avec succès.', type: Tasks,})
  @ApiResponse({status: 400, description: 'Les données envoyées ne sont pas valides.',})
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Tasks> {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les tâches' })
  @ApiResponse({ status: 200, description: 'Liste de toutes les tâches.' })
  @ApiResponse({status: 400, description: 'Liste des tâches non trouvé.',})
  findAll(): Promise<Tasks[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une tâche par ID' })
  @ApiParam({ name: 'id', description: 'L\'ID de la tâche à récupérer' })
  @ApiResponse({ status: 200, description: 'La tâche correspondant à l\'ID fourni.' })
  @ApiResponse({status: 400, description: 'Tâches non trouvé.',})
  findOne(@Param('id') id: string): Promise<Tasks> {
    return this.tasksService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour une tâche' })
  @ApiParam({ name: 'id', description: 'L\'ID de la tâche à mettre à jour' })
  @ApiResponse({ status: 200, description: 'La tâche a été mise à jour avec succès.' })
  @ApiResponse({status: 400, description: 'Erreur lors de la mise a jour.',})
  async update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une tâche' })
  @ApiParam({ name: 'id', description: 'L\'ID de la tâche à supprimer' })
  @ApiResponse({ status: 200, description: 'La tâche a été supprimée avec succès.' })
  @ApiResponse({status: 400, description: 'Erreur lors de la suppression.',})
  remove(@Param('id') id: string): Promise<void> {
    return this.tasksService.remove(+id);
  }
}
