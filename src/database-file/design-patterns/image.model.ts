import { Response } from "express";
import { Readable } from "stream";
import { FileModel } from "../_business/file.model";
import { FileStrategy } from "./strategy";
import { StreamableFile } from "@nestjs/common/file-stream";


export class Image implements FileStrategy  {

    constructor(){
    }
    returnFile(file: FileModel, response: Response): StreamableFile {
        const stream = Readable.from(file.data);
        response.set({
            'Content-Disposition': `inline; filename="${file.filename}"`,
            'Content-Type': 'image'
          })
        return new StreamableFile(stream); 
    }
}