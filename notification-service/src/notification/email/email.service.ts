import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USERNAME, 
        pass: process.env.GMAIL_APP_PASSWORD, 
      },
    });
  }

  async sendVerificationEmail(data: any) {
    try {
      console.log(data.user)
      console.log(`Sending email to ${data.user}`)
      const {user, otp} = data;
      const info = await this.transporter.sendMail({
        from: `"Support Team" <${process.env.DEFAULT_FROM_EMAIL}>`, // Sender address
        to: user, // Receiver address (e.g., from RabbitMQ payload)
        subject: 'Welcome to our platform!',
        text: `Hello ${user}, welcome to our service!`,
        html: `<b>Hello ${user}</b>, welcome to our service!, ${otp.code}`,
      });

      console.log('Email sent successfully:', info);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      // In a real app, you might want to throw this error so RabbitMQ can retry
      throw error;
    }
  }

  async sendResetPasswordEmail(data: any){
    try {
      
    } catch (error) {
       console.error('Error sending email:', error);
      // In a real app, you might want to throw this error so RabbitMQ can retry
      throw error;
    }
  }
}
