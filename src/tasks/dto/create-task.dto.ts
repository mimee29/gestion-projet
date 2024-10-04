import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';

export enum TaskStatus {
  PENDING = 'en attente',
  IN_PROGRESS = 'en cours',
  COMPLETED = 'terminée',
}

export class CreateTaskDto {
  @ApiProperty({
    description: 'Le titre de la tâche',
    example: 'Exemple de titre de tâche',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Une description de la tâche',
    example: 'Ceci est une description détaillée de la tâche.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Le statut de la tâche',
    enum: TaskStatus,
    example: TaskStatus.IN_PROGRESS,
  })
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiProperty({
    description: 'ID du projet auquel la tâche est assignée',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @IsPositive()
  project: number;

  @ApiProperty({
    description: 'ID de l’utilisateur assigné à la tâche',
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  assignedTo: number;
} 
