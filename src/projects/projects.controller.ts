import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { Projects } from './projects.entity/projects.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
 
@ApiTags('Projets')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouveau projet' })
  @ApiResponse({ status: 201, description: 'Le projet a été créé avec succès.' })
  @ApiResponse({ status: 400, description: 'Liste des Données invalides.' }) 
  create(@Body() createProjectDto: CreateProjectDto): Promise<Projects> {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer tous les projets' })
  @ApiResponse({ status: 200, description: 'Liste de tous les projets.' })
  @ApiResponse({ status: 404, description: 'Liste des projets non trouvé.' }) 
  findAll(): Promise<Projects[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un projet par ID' })
  @ApiParam({ name: 'id', description: 'L\'ID du projet à récupérer' })
  @ApiResponse({ status: 200, description: 'Le projet correspondant à l\'ID fourni.' })
  @ApiResponse({ status: 404, description: 'Projet non trouvé.' }) 
  findOne(@Param('id') id: string): Promise<Projects> {
    return this.projectsService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un projet' })
  @ApiParam({ name: 'id', description: 'L\'ID du projet à mettre à jour' })
  @ApiResponse({ status: 200, description: 'Le projet a été mis à jour avec succès.' })
  @ApiResponse({ status: 404, description: 'Projet non trouvé.' }) 
  update(@Param('id') id: number, @Body() updateProjectDto: UpdateProjectDto): Promise<Projects> {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un projet' })
  @ApiParam({ name: 'id', description: 'L\'ID du projet à supprimer' })
  @ApiResponse({ status: 200, description: 'Le projet a été supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'Projet non trouvé.' }) 
  remove(@Param('id') id: string): Promise<void> {
    return this.projectsService.remove(+id);
  }
}
