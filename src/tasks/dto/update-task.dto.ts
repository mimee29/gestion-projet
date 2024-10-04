import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Projects } from '../../projects/projects.entity/projects.entity';
import { Users } from '../../users/users.entity/users.entity';

export enum TaskStatus {
  PENDING = 'en attente',
  IN_PROGRESS = 'en cours',
  COMPLETED = 'terminée',
}

export class UpdateTaskDto {
  @ApiProperty({
    description: 'Le titre de la tâche',
    example: 'Exemple de titre de tâche',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'Une description de la tâche',
    example: 'Ceci est une description détaillée de la tâche.',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Le statut de la tâche',
    enum: TaskStatus,
    example: TaskStatus.IN_PROGRESS,
    required: false,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @ApiProperty({
    description: 'Le projet auquel la tâche est assignée',
    example: 1,
    type: () => Projects,
    required: false,
  })
  @IsOptional()
  @Type(() => Projects)
  project?: Projects;

  @ApiProperty({
    description: 'L’utilisateur assigné à la tâche',
    example: 1,
    type: () => Users,
    required: false,
  })
  @IsOptional()
  @Type(() => Users)
  assignedTo?: Users;
}
