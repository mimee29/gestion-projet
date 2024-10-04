import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; 
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { Users } from './users.entity/users.entity';

@ApiTags('Utilisateurs') 
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un nouvel utilisateur' }) 
  @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès.' }) 
  @ApiResponse({ status: 400, description: 'Liste des Données invalides.' }) 
  async create(@Body() createUserDto: CreateUserDto): Promise<Users> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtenir la liste de tous les utilisateurs' }) 
  @ApiResponse({ status: 200, description: 'Liste des utilisateurs retournée avec succès.' })  
  @ApiResponse({ status: 400, description: 'Listes des utiisateurs non trouvé.' }) 
  findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un utilisateur par ID' }) 
  @ApiResponse({ status: 200, description: 'Utilisateur trouvé.' }) 
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' }) 
  findOne(@Param('id') id: string): Promise<Users> {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mettre à jour un utilisateur' }) 
  @ApiResponse({ status: 200, description: 'Utilisateur mis à jour avec succès.' }) 
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' }) 
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Users> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un utilisateur' }) 
  @ApiResponse({ status: 200, description: 'Utilisateur supprimé avec succès.' }) 
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' }) 
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(+id);
  }
}
