import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    });
    it("should be able to list all available cars", async () => {
        const car = carsRepositoryInMemory.create({
            name: "car1",
            description: "test car 1",
            daily_rate: 150,
            license_plate: "abc-0001",
            fine_amount: 600,
            brand: "brand1",
            category_id: "category1"
        })

        const cars = await listAvailableCarsUseCase.execute({});
        expect(cars).toHaveLength(1);

    });
    it("should be able to list all available cars with same category", async () => {
        carsRepositoryInMemory.create({
            name: "car1",
            description: "test car 1",
            daily_rate: 150,
            license_plate: "abc-0001",
            fine_amount: 600,
            brand: "brand1",
            category_id: "category1"
        });
        carsRepositoryInMemory.create({
            name: "car2",
            description: "test car 2",
            daily_rate: 150,
            license_plate: "abc-0002",
            fine_amount: 600,
            brand: "brand2",
            category_id: "category2"
        });
        carsRepositoryInMemory.create({
            name: "car3",
            description: "test car 3",
            daily_rate: 150,
            license_plate: "abc-0003",
            fine_amount: 600,
            brand: "brand3",
            category_id: "category2"
        });

        const cars = await listAvailableCarsUseCase.execute({category_id: "category2"});
        expect(cars).toHaveLength(2);
    });
    it("should be able to list all available cars with same name", async () => {
        carsRepositoryInMemory.create({
            name: "car1",
            description: "test car 1",
            daily_rate: 150,
            license_plate: "abc-0001",
            fine_amount: 600,
            brand: "brand1",
            category_id: "category1"
        });
        carsRepositoryInMemory.create({
            name: "car1",
            description: "test car 2",
            daily_rate: 150,
            license_plate: "abc-0002",
            fine_amount: 600,
            brand: "brand2",
            category_id: "category2"
        });
        carsRepositoryInMemory.create({
            name: "car2",
            description: "test car 3",
            daily_rate: 150,
            license_plate: "abc-0003",
            fine_amount: 600,
            brand: "brand3",
            category_id: "category1"
        });

        const cars = await listAvailableCarsUseCase.execute({ name:"car1",});
        expect(cars).toHaveLength(2);
    });
    it("should be able to list all available cars with same brand ", async () => {
        carsRepositoryInMemory.create({
            name: "car1",
            description: "test car 1",
            daily_rate: 150,
            license_plate: "abc-0001",
            fine_amount: 600,
            brand: "brand1",
            category_id: "category1"
        })
        carsRepositoryInMemory.create({
            name: "car2",
            description: "test car 2",
            daily_rate: 150,
            license_plate: "abc-0002",
            fine_amount: 600,
            brand: "brand2",
            category_id: "category2"
        });
        carsRepositoryInMemory.create({
            name: "car3",
            description: "test car 3",
            daily_rate: 150,
            license_plate: "abc-0003",
            fine_amount: 600,
            brand: "brand1",
            category_id: "category3"
        });

        const cars = await listAvailableCarsUseCase.execute({brand:"brand1"});
        expect(cars).toHaveLength(2);
    });
})