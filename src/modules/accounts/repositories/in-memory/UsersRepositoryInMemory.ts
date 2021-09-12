import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreatedUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";


class UsersRepositoryInMemory implements IUsersRepository{
    
    users: User[] = [];
    
    async findById(id: string):Promise<User> {
        const user = this.users.find(user => user.id === id) as User;
        return user;
    }

    async findByEmail(email: string): Promise<User> {
       const user = this.users.find(user => user.email === email) as User;
       return user;
    }
    
    async create({name, email, password, driver_license}: ICreateUserDTO): Promise<void> {
        const user = new User();
        Object.assign(user,{
            name, 
            email, 
            password, 
            driver_license,
        });

        await this.users.push(user);
    }

}

export { UsersRepositoryInMemory }