import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import Room from "./Room";

@Entity({ name: 'schedule' })
class Schedule {
    @PrimaryGeneratedColumn()
    id_schedule!: number;

    @ManyToOne((type) => Room, (room) => room.schedule)
    @JoinColumn({ name: 'id_room_fk' })
    room!: Room;

    @Column({ type: 'date'})
    start_date!: Date;

    @Column({ type: 'date' })
    end_date!: Date;

    @Column({ type: 'time' }) 
    start_time!: string;
    
    @Column({ type: 'time' }) 
    end_time!: string;

    @Column()
    request_name!: string;

    @Column() 
    event_name!: string;
}

export default Schedule;