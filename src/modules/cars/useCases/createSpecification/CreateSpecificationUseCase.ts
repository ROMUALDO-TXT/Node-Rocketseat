import {inject, injectable} from "tsyringe";
import { ICreateSpecificationDTO } from "../../dtos/ICreateSpecificationDTO";
import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";

@injectable()
class CreateSpecificationUseCase{
    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: SpecificationsRepository){};

    async execute({description, name}: ICreateSpecificationDTO):Promise<void> {
        const SpecificationAlreadyExists = await this.specificationsRepository.findByName(name);
        if(SpecificationAlreadyExists){
            throw new Error("Specification already exists!");
        }

        await this.specificationsRepository.create({name, description});
    };
}
export {CreateSpecificationUseCase};