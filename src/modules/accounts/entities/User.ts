import {v4 as uuidv4} from "uuid";
import { Column, CreateDateColumn, Entity, Generated, PrimaryColumn } from "typeorm";


@Entity("users")
class User{

    @PrimaryColumn()
    id?: string;

    @Column("name")
    name: string;

    @Column("username")
    username: string;

    @Column("email")
    email: string;

    @Column("password")
    password: string;

    @Column("driver_license")
    driver_license: string;

    @Column("isAdmin")
    isAdmin: boolean;

    @CreateDateColumn()
    created_at: Date;

    constructor(){
        if(!this.id){
            this.id = uuidv4();
        }
    }
}

export {User};