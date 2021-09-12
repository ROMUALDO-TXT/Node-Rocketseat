import { compare } from "bcryptjs";
import { inject, injectable} from "tsyringe";
import { sign } from "jsonwebtoken";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

interface IRequest{
    email: string;
    password: string;
}

interface IResponse{
    user:{
        name: string,
        email: string,
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase{

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async execute({email, password}:IRequest):Promise<IResponse>{

        const user = await this.usersRepository.findByEmail(email) as User;
        if(!user){
            throw new AppError("Email or Password incorrect!");
        }

        const passwordMatch = await compare(password, user.password);
        if(!passwordMatch){
            throw new AppError("Email or Password incorrect!");
        }

        const token = sign({},"ac45ce951975d8aec9ddfecbed728c14", {
            subject: user.id.toString(),
            expiresIn: "1d",
        });
        
        const tokenReturn :IResponse = {
            token,
            user:{
                name: user.name,
                email: user.email,
            },
        }
        return (tokenReturn);
    }
}

export {AuthenticateUserUseCase}