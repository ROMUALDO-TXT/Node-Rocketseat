
import { getRepository, Repository } from "typeorm";
import { ICreateSpecificationDTO } from "../../dtos/ICreateSpecificationDTO";
import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository} from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository{

    private repository: Repository<Specification>;
    constructor(){
        this.repository = getRepository(Specification);
    }

    async create({description, name} : ICreateSpecificationDTO):Promise<void> {
        const specification = this.repository.create({
            description,
            name
        });

        await this.repository.save(specification);
    }
    list(): Promise<Specification[]>{
        return this.repository.find();
    }
    findByName(name:string): Promise<Specification>{
        const specification = this.repository.findOne({name});
        return specification;
    }
}
export {SpecificationsRepository};