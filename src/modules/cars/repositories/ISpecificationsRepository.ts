import {Specification} from "../model/Specification"

interface ICreateSpecificationDTO{
    name: string;
    description: string;
}
interface ISpecificationsRepository{
    findByName(name: string): Specification;
    create({description, name}: ICreateSpecificationDTO):void;
    list(): Specification[];
}

export {ICreateSpecificationDTO, ISpecificationsRepository};