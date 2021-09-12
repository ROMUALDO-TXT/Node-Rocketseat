import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { ICreateCategoryDTO } from "@modules/cars/dtos/ICreateCategoryDTO";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

@injectable()
class CreateCategoryUseCase{
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository){}

    async execute({description, name}: ICreateCategoryDTO):Promise<void> {
        const categoryAlreadyExists = await this.categoriesRepository.findByName(name);
        if(categoryAlreadyExists){
          throw new AppError("Category already exists!");
        }

        await this.categoriesRepository.create({name, description});
    };
}
export {CreateCategoryUseCase};