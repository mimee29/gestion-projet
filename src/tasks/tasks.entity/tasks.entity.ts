import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Projects } from '../../projects/projects.entity/projects.entity';
import { Users } from '../../users/users.entity/users.entity';

export enum TaskStatus {
  PENDING = 'en attente',
  IN_PROGRESS = 'en cours',
  COMPLETED = 'terminée',
}

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.IN_PROGRESS,
  })
  status: TaskStatus;

  @ManyToOne(() => Projects, project => project.id)
  @JoinColumn({ name: 'project' })
  project: Projects;

  @ManyToOne(() => Users, user => user.id)
  @JoinColumn({ name: 'assignedTo' })
  assignedTo: Users;
}
