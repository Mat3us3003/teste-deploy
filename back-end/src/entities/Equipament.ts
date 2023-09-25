import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Room from "./Room";

@Entity({name: 'equipament'})
class Equipament {
    @PrimaryGeneratedColumn()
    id_equipament!: number;

    @Column()
    name!: string;

    @Column({ nullable: true })
    number_serie!: string;

    @Column({ nullable: true })
    patrimony!: string;
    
    @Column({ nullable: true })
    model!: string;

    @Column({ nullable: true })
    status!: string

    @ManyToOne((type) => Room, (room) => room.equipament)
    @JoinColumn({ name: 'id_room_fk' })
    room!: string
}

export default Equipament;