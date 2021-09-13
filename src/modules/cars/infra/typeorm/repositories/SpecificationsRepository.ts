
import { getRepository, Repository } from "typeorm";
import { ICreateSpecificationDTO } from "@modules/cars/dtos/ICreateSpecificationDTO";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationsRepository} from "@modules/cars/repositories/ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository{

    private repository: Repository<Specification>;
    constructor(){
        this.repository = getRepository(Specification);
    }


    async create({description, name} : ICreateSpecificationDTO):Promise<Specification> {
        const specification = this.repository.create({
            description,
            name
        });

        await this.repository.save(specification);
        return specification;
    }
    async list(): Promise<Specification[]>{
        return await this.repository.find();
    }
    async findByName(name:string): Promise<Specification>{
        const specification = await this.repository.findOne({name});
        return specification;
    }    
    async findByids(ids: string[]): Promise<Specification[]> {
        const specifications = await this.repository.findByIds(ids);
        return specifications
    }
}
export {SpecificationsRepository};