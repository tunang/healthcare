import { Controller } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('notification')
export class NotificationController {
    constructor (private readonly notificationService: NotificationService){}

    @EventPattern('send_otp')
    async handleUserCreated(data: any){
        console.log("Receive data")
        this.notificationService.handleUserCreated(data)
    }

    @EventPattern('send_reset_password')
    async handleResetPasswordRequest(data: any){
        
    }
}
