import { ICreateUserDTO } from "../dtos/ICreatedUserDTO";

interface IUsersRepository{
    create(data: ICreateUserDTO): Promise<void>;

}

export { IUsersRepository };