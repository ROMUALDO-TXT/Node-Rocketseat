import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateCarUseCase{

    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository){}

    async execute(data: ICreateCarDTO): Promise<Car>{
        const {name, description, daily_rate, license_plate, fine_amount, brand, category_id } = data;
        const carAlreadyExists = await this.carsRepository.findByLicensePlate(license_plate);

        if(carAlreadyExists){
            throw new AppError("Car already exists");
        }
        return this.carsRepository.create({name, description, daily_rate, license_plate, fine_amount, brand, category_id});
        
    }
}

export { CreateCarUseCase };