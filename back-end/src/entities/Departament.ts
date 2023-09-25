import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Authorizer from "./Authorizer";

@Entity({name:'departament'})
class Departament {
    @PrimaryGeneratedColumn()
    id_departament!: number; 

    @Column()
    name!: string;
    
    @Column()
    type!: string;

    @Column()
    email!: string;

    @Column()
    phone!: string;

    @OneToMany((type) => Authorizer, (authorizer) => authorizer.departament)
    authorizer!: Authorizer[]; 
}


export default Departament;