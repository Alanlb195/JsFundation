import * as fs from 'fs';

export interface SaveFileUseCase {

    execute: (options: Options) => boolean;

}

export interface Options {
    fileContent: string;
    fileDestination: string;
    fileName: string;
}


export class SaveFile implements SaveFileUseCase {

    constructor(
        /**
         * DI - Dependency Injection 
         */
    ) { }

    execute({
        fileContent,
        fileDestination,
        fileName
    }: Options): boolean {

        try {
            fs.mkdirSync(fileDestination, { recursive: true });
            fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent);
            return true;
        } catch(error) {
            // console.log(error); // TODO: use windton to manage log Errors
            return false;
        }

    }
}