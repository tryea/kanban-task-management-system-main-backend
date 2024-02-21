import { Global, Module } from '@nestjs/common';
import { RepositoriesService } from './repositories.service';
import { UserRepository } from './repository/user-repository';
import { PrismaModule } from 'src/prisma/prisma.module';

const repos = [RepositoriesService, UserRepository];

@Global()
@Module({
  imports: [PrismaModule],
  providers: [...repos],
  exports: [...repos],
})
export class RepositoriesModule {}
