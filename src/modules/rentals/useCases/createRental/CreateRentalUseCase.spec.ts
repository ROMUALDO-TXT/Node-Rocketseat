import dayjs from "dayjs";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/inMemory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental"
import { AppError } from "@shared/errors/AppError";
import { DayJsDateProvider } from "@shared/container/providers/dateProvider/implementations/DayJsDateProvider";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayJsDateProvider: DayJsDateProvider;


describe("Create Rental", () => {
    const dayAdd24Hours = dayjs().add(1, "day").toDate();
    const dayAdd23Hours = dayjs().add(23, "hours").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayJsDateProvider = new DayJsDateProvider();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, dayJsDateProvider);
    });

    it("Should be able to create a new rental", async () => {

        const rental = await createRentalUseCase.execute({
            user_id: "1234",
            car_id: "121212",
            expected_return_date: dayAdd24Hours,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("Should not be able to create a new rental for a user that have an active contract", async () => {
        expect( async () => {
            await createRentalUseCase.execute({
                user_id: "1234",
                car_id: "121212",
                expected_return_date: dayAdd24Hours,
            });
            await createRentalUseCase.execute({
                user_id: "1234",
                car_id: "131313",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);

    });

    it("Should not be able to create a new rental for a already rented car", async () => {
        expect( async () => {
            await createRentalUseCase.execute({
                user_id: "1234",
                car_id: "121212",
                expected_return_date: dayAdd24Hours,
            });
            await createRentalUseCase.execute({
                user_id: "4321",
                car_id: "121212",
                expected_return_date: dayAdd24Hours,
            });
        }).rejects.toBeInstanceOf(AppError);

    });
    it("Should not be able to create a new rental with less then 24 hours of duration", async () => {
        expect( async () => {
            await createRentalUseCase.execute({
                user_id: "1234",
                car_id: "121212",
                expected_return_date: dayAdd23Hours,
            });
        }).rejects.toBeInstanceOf(AppError);

    });
})