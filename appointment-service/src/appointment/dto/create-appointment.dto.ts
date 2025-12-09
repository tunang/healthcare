import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty()
  patientId: number;

  @ApiProperty()
  patientEmail: string; // Để test gửi mail luôn

  @ApiProperty()
  doctorId: number;

  @ApiProperty()
  startTime: string; // Dạng ISO string: "2023-12-25T10:00:00Z"
  
  @ApiProperty()
  notes: string;
}
