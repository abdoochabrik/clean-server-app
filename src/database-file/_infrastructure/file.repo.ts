import { Injectable } from "@nestjs/common/decorators";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateResult } from "../../_core/_business/base.types";
import { Repository} from "typeorm";
import { BaseRepository } from "../../_core/_infrastructure/base.repo";
import FileEntity from "./file.entity";


@Injectable()
export default class fileRepository extends BaseRepository<FileEntity> {

    constructor(@InjectRepository(FileEntity)  private readonly fileRepository: Repository<FileEntity>) {
        super(fileRepository)
 
    }

    public async uploadFile(imageBuffer:Buffer, filename:string) : Promise<FileEntity> {
        const newFile = await this.fileRepository.save({filename,data:imageBuffer});
        return newFile
    }

    public async updateFile(id:string,file:Partial<FileEntity>):Promise<UpdateResult<FileEntity>> {
        const updateResult = await this.fileRepository.update(id,{...file});
        const {affected}=updateResult
        const foundbook = await this.fileRepository.findOne({ where: { 'id' : id }})
        const result = new UpdateResult<FileEntity>(affected,[foundbook])
        return result;
     }

    public async getFileById(id:string): Promise<FileEntity>{ 
     return await this.fileRepository.findOne({where : { 'id': id}}) 
    } 

}