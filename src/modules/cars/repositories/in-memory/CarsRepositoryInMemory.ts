import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";


class CarsRepositoryInMemory implements ICarsRepository {


    cars: Car[] = [];

    async create(data: ICreateCarDTO): Promise<Car> {
        const car = new Car();
        const { name, description, daily_rate, license_plate, fine_amount, brand, category_id } = data;

        Object.assign(car, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        })

        this.cars.push(car);
        return car;
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate) as Car;
    }

    async findAvailable(brand?: string, name?: string, category_id?: string): Promise<Car[]> {
        const a1 = this.cars.filter(car => car.available === true); 
        if(brand || name || category_id){
            const a2 = a1.filter(car => {
                if((brand && car.brand === brand) || (name && car.name === name) || (category_id && car.category_id === category_id)){
                    return car;
                }   
                return null;
            });
            return a2;
        }
        return a1;
        
    }

}

export { CarsRepositoryInMemory };