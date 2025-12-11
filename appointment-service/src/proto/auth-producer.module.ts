import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Global()
@Module({
imports: [
    ClientsModule.register([
      {
        name: 'AUTH_PACKAGE', // Token inject
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: join(__dirname,'../../../', 'src/proto/auth.proto'), // Trỏ đúng file .proto
          url: 'localhost:50051', // Gọi vào port gRPC của Auth Service
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class AuthProducerGRPCModule {}
