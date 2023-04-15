import { FileStrategy  } from "./strategy";
import { FileType } from "./file.enum";
import { Image} from "./image.model";
import { Pdf} from "./pdf.model";


export class FileFactory {
    
    public static getFileController(fileType:FileType): FileStrategy  | null {

        if(fileType == FileType.IMAGE) {
            return new Image()
        }
        if(fileType == FileType.PDF){
            return new Pdf()
        }

        return null
    }

}