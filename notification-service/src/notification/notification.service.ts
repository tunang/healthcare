import { Injectable } from '@nestjs/common';
import { EmailService } from './email/email.service';

@Injectable()
export class NotificationService {
    constructor(private readonly emailService: EmailService){}

    async handleUserCreated(data: any){
        this.emailService.sendVerificationEmail(data)
    }
    
}
