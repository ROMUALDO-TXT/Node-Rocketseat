import { injectable, inject } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreatedUserDTO";
import { UsersRepository } from "../../repositories/implementations/UsersRepostiory";
import { IUsersRepository } from "../../repositories/IUsersRepository";


@injectable()
class CreateUserUseCase{
    constructor(
        @inject(UsersRepository)
        private usersRepository: IUsersRepository
    ){};
    async execute({name, username, email, password, driver_license}: ICreateUserDTO): Promise<void>{
        await this.usersRepository.create({
            name,
            username, 
            email, 
            password, 
            driver_license
        });
    }

}

export{CreateUserUseCase}