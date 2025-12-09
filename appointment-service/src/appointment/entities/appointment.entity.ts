// src/appointment/appointment.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum AppointmentStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('uuid') // Vẫn giữ nguyên, SQLite vẫn chạy tốt
  id: string;

  @Column()
  patientId: number;

  @Column()
  doctorId: number;

  @Column() // SQLite lưu Date dưới dạng chuỗi/số, nhưng TypeORM sẽ tự parse cho bạn
  startTime: Date;

  @Column()
  endTime: Date;

  @Column({
    type: 'simple-enum', // Với SQLite nên dùng 'simple-enum' hoặc bỏ type đi để nó tự hiểu là varchar
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
  })
  status: AppointmentStatus;

  @Column({ nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}