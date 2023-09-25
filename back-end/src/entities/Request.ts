import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";
import Room from "./Room";

@Entity({ name: 'request' })
class Request {
    @PrimaryGeneratedColumn()
    id_request!: number;

    @Column()
    event_name!: string;

    @Column()
    description!: string;

    @Column({ type: 'date' })
    start_date!: Date;

    @Column({ type: 'date' })
    end_date!: Date;

    @Column({ type: 'time' })
    start_time!: string;

    @Column({ type: 'time' })
    end_time!: string;

    @Column({ nullable: true })
    equipaments!: string;

    @Column()
    status!: string;

    @ManyToOne((type) => User, (user) => user.request)
    @JoinColumn({ name: 'id_user_fk' })
    user!: User;

    @ManyToOne((type) => Room, (room) => room.request)
    @JoinColumn({ name: 'id_room_fk' })
    room!: Room;
}

export default Request;