import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create Car", ()=>{

    beforeEach(()=>{
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    })
    it("should be able to create a new car", async ()=>{
        const car = await createCarUseCase.execute({
            name:"car1",
            description:"test car 1",
            daily_rate: 150,
            license_plate:"abc-0000",
            fine_amount:600,
            brand:"brand",
            category_id:"category",
        });
        expect(car).toHaveProperty("id");
    })
    it("Should not be able to create a car with a existent license_plate", ()=>{
        expect( async ()=>{
            await createCarUseCase.execute({
                name:"car1",
                description:"test car 1",
                daily_rate: 150,
                license_plate:"abc-0000",
                fine_amount:600,
                brand:"brand",
                category_id:"category",
            });
            await createCarUseCase.execute({
                name:"car2",
                description:"test car 2",
                daily_rate: 150,
                license_plate:"abc-0000",
                fine_amount:600,
                brand:"brand",
                category_id:"category",
            });
        }).rejects.toBeInstanceOf(AppError);
    })
    it("Should be able to create a car with available true", async()=>{
        const car = await createCarUseCase.execute({
            name:"car1",
            description:"test car 1",
            daily_rate: 150,
            license_plate:"abc-0000",
            fine_amount:600,
            brand:"brand",
            category_id:"category",
        })
        expect(car.available).toBe(true);
    })
});