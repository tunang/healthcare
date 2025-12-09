import { Injectable } from '@nestjs/common';
import { EmailService } from './email/email.service';

@Injectable()
export class NotificationService {
    constructor(private readonly emailService: EmailService){}

    async handleUserCreated(data: any){
        console.log("Sending email")
        console.log(data)
        this.emailService.sendVerificationEmail(data)
    }

    
}
