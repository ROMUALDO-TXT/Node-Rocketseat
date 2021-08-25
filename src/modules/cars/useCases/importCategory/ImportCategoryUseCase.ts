import fs from "fs"
import csvParse from "csv-parse";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { resolveModuleName, resolveProjectReferencePath } from "typescript";

interface IImportCategory{
    name: string;
    description: string;
}

class ImportCategoryUseCase{
    constructor(private categoriesRepository: CategoriesRepository){}
    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]>{
      return new Promise((resolve,reject)=>{
        const categories: IImportCategory[] = [];
        const stream = fs.createReadStream(file.path);
        const parseFile = csvParse({});

        stream.pipe(parseFile);

        parseFile.on("data", async (line) =>{
            const [name, description] = line;
            categories.push({
                name,
                description,
            })
        }).on("end", () => {
            fs.promises.unlink(file.path);
            resolve(categories);
        }).on("error", ()=>{
            reject(Error);
        })
    })}

    async execute(file: Express.Multer.File):Promise<void>{
        const categories = await this.loadCategories(file);
        categories.map(category => {
            const {name, description} = category;
            const existCategory = this.categoriesRepository.findByName(name);
            if(!existCategory){
                this.categoriesRepository.create({description,name});
            }
        });
    }

}
export {ImportCategoryUseCase}