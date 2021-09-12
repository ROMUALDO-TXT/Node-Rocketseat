import {inject, injectable} from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { ICreateSpecificationDTO } from "@modules/cars/dtos/ICreateSpecificationDTO";
import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";

@injectable()
class CreateSpecificationUseCase{
    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: SpecificationsRepository){};

    async execute({description, name}: ICreateSpecificationDTO):Promise<void> {
        const SpecificationAlreadyExists = await this.specificationsRepository.findByName(name);
        if(SpecificationAlreadyExists){
            throw new AppError("Specification already exists!");
        }

        await this.specificationsRepository.create({name, description});
    };
}
export {CreateSpecificationUseCase};