import { ICreateSpecificationDTO } from "@modules/cars/dtos/ICreateSpecificationDTO";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationsRepository } from "../ISpecificationsRepository";


class SpecificationRepositoryInMemory implements ISpecificationsRepository{
    
    specifications: Specification[]=[];

    async findByName(name: string): Promise<Specification> {
        const specification = this.specifications.find((specification) => specification.name === name) as Specification;
        return specification;
    }
    async create(data: ICreateSpecificationDTO): Promise<Specification> {
        const {name, description} = data;
        const specification = new Specification();
        
        Object.assign(specification,{
            name,
            description,
        })
        this.specifications.push(specification);
        return specification;
    }
    async list(): Promise<Specification[]> {
        const all = this.specifications;
        return all;
    }
    async findByids(ids: string[]): Promise<Specification[]> {
        const all = this.specifications.filter((specification) => ids.includes(specification.id))
        return all;
    }
    
    

} 

export { SpecificationRepositoryInMemory };