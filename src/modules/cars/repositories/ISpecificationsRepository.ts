import { ICreateSpecificationDTO } from "@modules/cars/dtos/ICreateSpecificationDTO";
import {Specification} from "@modules/cars/infra/typeorm/entities/Specification"
interface ISpecificationsRepository{
    findByName(name: string): Promise<Specification>;
    create(data: ICreateSpecificationDTO):Promise<void>;
    list(): Promise<Specification[]>;
}

export {ISpecificationsRepository};