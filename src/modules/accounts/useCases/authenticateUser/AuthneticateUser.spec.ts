import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreatedUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe ("authenticate user", ()=>{
    
    beforeEach(()=>{
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    })
    
    it("It should be able to generate a token", async()=>{
        const user: ICreateUserDTO ={
            driver_license: "0001111",
            email: "lucasrl2003@gmail.com",
            password:"1234",
            name:"lucas",
        };
        await createUserUseCase.execute(user);
        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    })
    it("It should not be able to authenticate a nonexistent user", ()=>{
        expect(async ()=>{
            await authenticateUserUseCase.execute({
                email: "false@email.com",
                password: "4321",
            })
        }).rejects.toBeInstanceOf(AppError);
    })
    it("It should not be able to authenticate a user with incorrect password", ()=>{
        expect(async ()=>{ 
            const user: ICreateUserDTO ={
                driver_license: "0001111",
                email: "teste@gmail.com",
                password:"1234",
                name:"lucas",
            };
            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: "teste@email.com",
                password: "4321",
            })
        }).rejects.toBeInstanceOf(AppError);
    })
})