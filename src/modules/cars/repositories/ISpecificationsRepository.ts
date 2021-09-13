import { ICreateSpecificationDTO } from "@modules/cars/dtos/ICreateSpecificationDTO";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification"
interface ISpecificationsRepository {
    findByName(name: string): Promise<Specification>;
    create(data: ICreateSpecificationDTO): Promise<Specification>;
    list(): Promise<Specification[]>;
    findByids(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationsRepository };