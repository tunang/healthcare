import { Injectable } from "@nestjs/common";

@Injectable()

export class EmailService{
    private transporter;
    constructor(){
        this.transporter
    }   
}