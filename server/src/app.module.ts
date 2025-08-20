import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CONSTANTS } from './constants';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        dialect: 'postgres',
        uri: CONSTANTS.DB_CONNECT,
        autoLoadModels: true,
        synchronize: true,
        logging: false,
      }),
    }),
    UsersModule,
    AuthModule,
    CategoryModule,
  ],
  // controllers: [CategoryController],
})
export class AppModule {}

// @Module({
//   imports: [
//     ConfigModule.forRoot({ isGlobal: true }),
//     SequelizeModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) => ({
//         dialect: 'postgres',
//         uri: configService.get<string>('DB_CONNECT'),
//         // models: [User],
//         autoLoadModels: true,
//         synchronize: true,
//         logging: false,
//         // dialectOptions: {
//         //   ssl: {
//         //     require: true,
//         //     rejectUnauthorized: false,
//         //   },
//         // },
//       }),
//     }),
//     UsersModule,
//   ],
// })
// export class AppModule {}