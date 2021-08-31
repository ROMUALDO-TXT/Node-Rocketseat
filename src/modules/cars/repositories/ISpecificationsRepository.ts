import { ICreateSpecificationDTO } from "../dtos/ICreateSpecificationDTO";
import {Specification} from "../entities/Specification"
interface ISpecificationsRepository{
    findByName(name: string): Promise<Specification>;
    create({description, name}: ICreateSpecificationDTO):Promise<void>;
    list(): Promise<Specification[]>;
}

export {ISpecificationsRepository};