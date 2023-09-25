import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";
import Room from "./Room";
import Departament from "./Departament";

@Entity()
class Authorizer {
    @PrimaryGeneratedColumn()
    id_authorizer!: number;

    @ManyToOne((type) => User, (user) => user.authorizer)
    @JoinColumn({ name: 'id_user_fk' })
    user!: User;

    @ManyToOne((type) => Room, (room) => room.authorizer)
    @JoinColumn({ name: 'id_room_fk' })
    room!: Room;

    @ManyToOne((type) => Departament, (departament) => departament.authorizer)
    @JoinColumn({ name: 'id_departament_fk' })
    departament!: Departament;

}

export default Authorizer;