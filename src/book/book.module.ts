import { Module } from '@nestjs/common';
import { Global } from '@nestjs/common/decorators/modules/global.decorator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '../_core/core.module';
import { BookServiceImplementation } from './_business/book.service.implementation';
import { BookEntity } from './_infrastructure/book.entity';
import { BookRepository } from './_infrastructure/book.repo';
import { CreateBookUseCase } from './_use-cases/add_book/add-book.use-case';
import { DeleteBookUseCase } from './_use-cases/delete_book/delete-book.use-case';
import { GetBookByIdUseCase } from './_use-cases/get_book_by_id/get-book-by-id.use-case';
import { ProfileServiceImpl } from '../profile/_business/profile.service.implementation';
import { GetProfileByIdUseCase } from '../profile/_use-cases/get_profile_by_id/get-profile-by-id.use-case';
//import { PaginateProfilesUseCase } from './_use-cases/paginate_profiles/paginate_profiles.use-case';
import { BookController } from './_use-cases/book.controller';
import { ProfileRepository } from '../profile/_infrastructure/profile.repo';

@Global()
@Module({

    imports:[CoreModule,
        TypeOrmModule.forFeature([
            BookEntity
          ]), ],
    controllers: [BookController],    
    providers: [BookServiceImplementation,
                BookRepository,
                CreateBookUseCase,
                DeleteBookUseCase,
                GetBookByIdUseCase,
                ProfileServiceImpl,
                GetProfileByIdUseCase,
               ]  
})


export class BookModule {}
