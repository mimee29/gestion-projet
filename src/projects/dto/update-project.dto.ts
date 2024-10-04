import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsEnum, IsArray } from 'class-validator';

export enum ProjectStatus {
    PENDING = 'en attente',
    IN_PROGRESS = 'en cours',
    COMPLETED = 'achever',
}

export class UpdateProjectDto{
    @ApiProperty({ description: 'Le nom du projet', example: 'nestjs',})
    @IsString()
    @IsNotEmpty()
    readonly name?: string;

    @ApiProperty({ description: 'La description du projet', 
    example: 'Ce projet concerne le développement d\'une application en nestjs.', })
    @IsString()
    @IsNotEmpty()
    readonly description?: string;

    @ApiProperty({description: 'Le statut du projet', example: 'en cours', enum: ProjectStatus, })
    @IsEnum(ProjectStatus)
    readonly status?: ProjectStatus;

    @ApiProperty({ description: 'Liste des membres associés au projet',
        type: [Number], example: [[1], [2]], required: false,})
    @IsOptional()
    @IsArray()
    @IsArray({ each: true })
    readonly members?: number[];
}
