import { StreamableFile } from "@nestjs/common/file-stream";
import { Response } from "express";
import { FileModel } from "../_business/file.model";


export interface FileStrategy {
     returnFile(file:FileModel, response: Response):StreamableFile;
}