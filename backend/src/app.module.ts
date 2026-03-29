import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DomainsModule } from './domains/domains.module';
import { QuestionsModule } from './questions/questions.module';
import { ResultsModule } from './results/results.module'; 
import { CategoriesModule } from './categories/categories.module';
import { RoadmapTemplatesModule } from './roadmap-templates/roadmap-templates.module';
import { InstitutionsModule } from './institutions/institutions.module';
import { RoadmapsModule } from './roadmaps/roadmaps.module';


import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AiModule } from './ai/ai.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
      }),
    }),
    UsersModule,
    AuthModule,
    DomainsModule,
    QuestionsModule,
    ResultsModule,
    CategoriesModule,
    RoadmapTemplatesModule,
    AiModule,
    InstitutionsModule,
    RoadmapsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
 
})
export class AppModule {}