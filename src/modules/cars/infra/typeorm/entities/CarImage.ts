import { v4 as uuidV4 } from "uuid";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Car } from "./Car";


@Entity()
class CarImage {

    @PrimaryColumn()
    id: string;

    //@OneToMany(()=> Car)
    @JoinColumn({ name: "car_id" })
    car: Car;


    @Column()
    car_id: string;

    @Column()
    image_name: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { CarImage };