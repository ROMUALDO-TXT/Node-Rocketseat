import { injectable, inject } from "tsyringe";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IDateProvider } from "@shared/container/providers/dateProvider/IDateProvider";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

@injectable()
class CreateRentalUseCase{
    
    constructor(
        @inject("RentalsRepository") private rentalsRepository: IRentalsRepository,
        @inject("DateProvider") private dateProvider: IDateProvider,
        ){
    }
    async execute({user_id, car_id, expected_return_date}:ICreateRentalDTO):Promise<Rental>{
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);
        const minimumDuration = 24;
        if(carUnavailable){
            throw new AppError("Car Unavailable!");
        }

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);
        if(rentalOpenToUser){
            throw new AppError("There's a rental in progress for this user!");
        }

        const compare = this.dateProvider.compare(this.dateProvider.dateNow(), expected_return_date);
        if(compare < minimumDuration){
            throw new AppError("The contract must have a minimum duration of 24 hours!");
        }


        const rental = this.rentalsRepository.create({user_id, car_id, expected_return_date});
        return rental;
    }
}

export { CreateRentalUseCase }