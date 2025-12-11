import { Inject, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import type { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Observable } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { Repository } from 'typeorm';
import { App } from 'supertest/types';

// Interface định nghĩa hàm khớp với .proto
export interface AuthGrpcService {
  validateUser(data: { id: number; role: string }): Observable<{ isValid: boolean }>;
}

@Injectable()
export class AppointmentService {
  private authGrpcService: AuthGrpcService;

  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepo: Repository<Appointment>,

    @Inject('AUTH_PACKAGE') 
    private client: ClientGrpc // Inject ClientGrpc
  ) {}

  onModuleInit() {
    // Lấy service instance khi module khởi tạo
    this.authGrpcService = this.client.getService<AuthGrpcService>('AuthService');
  }

  async create(createDto: CreateAppointmentDto) {
    // Gọi gRPC (Nhanh hơn RabbitMQ rất nhiều)
    const isDoctor : any = await lastValueFrom(
      this.authGrpcService.validateUser({ id: createDto.doctorId, role: 'DOCTOR' })
    );

    const isPatient : any = await lastValueFrom(
      this.authGrpcService.validateUser({ id: createDto.patientId, role: 'PATIENT' })
    );

    if (!isDoctor.isValid) {
      throw new Error('Doctor not found');
    }

    if (!isPatient.isValid) {
      throw new Error('Patient not found');
    }
    
    const appointment = this.appointmentsRepo.create({
      patientId: createDto.patientId,
      doctorId: createDto.doctorId,
      startTime: new Date(createDto.startTime),
      endTime: new Date(createDto.startTime),
      notes: createDto.notes
    })

    await this.appointmentsRepo.save(appointment)
  }

  findAll() {
    return `This action returns all appointment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return `This action updates a #${id} appointment`;
  }

  remove(id: number) {
    return `This action removes a #${id} appointment`;
  }
}
