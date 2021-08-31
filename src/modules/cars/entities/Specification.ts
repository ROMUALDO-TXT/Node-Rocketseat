import { v4 as uuidV4 } from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity()
class Specification{

    @PrimaryColumn()
    id?: string;

    @Column("name")
    name: string;

    @Column("description")
    description: string;

    @CreateDateColumn()
    created_at: Date;
    constructor(){
        if(!this.id){
            this.id = uuidV4();
        }

    }
}

export {Specification};