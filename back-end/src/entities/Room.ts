import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import Schedule from "./Schedule";
import Authorizer from "./Authorizer";
import Request from "./Request";
import Equipament from "./Equipament";

@Entity({name: 'room'})
class Room {
    @PrimaryGeneratedColumn()
    id_room!: number;

    @Column()
    name!: string;

    @Column()
    capacity!: number; 

    @Column()
    type!: string;

    @Column()
    especificity!: string;

    @Column({ nullable: true }) 
    location!: string;

    @OneToMany((type) => Schedule, (schedule) => schedule.room)
    schedule!: Schedule[];    

    @OneToMany((type) => Authorizer, (authorizer) => authorizer.room)
    authorizer!: Authorizer[]; 
    
    @OneToMany((type) => Request, (request) => request.room)
    request!: Request[]; 

    @OneToMany((type) => Equipament, (equipament) => equipament.room)
    equipament!: Equipament;
}

export default Room;