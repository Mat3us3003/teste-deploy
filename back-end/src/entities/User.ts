import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Authorizer from "./Authorizer";
import Request from "./Request";

@Entity({name: 'user'})
class User {
    @PrimaryGeneratedColumn()
    id_user!: number;
    
    @Column()
    name!: string;

    @Column({ unique: true }) 
    email!: string;

    @Column()
    password!: string;

    @Column({ length: 32 })
    salt!: string;

    @Column({ length: 11, unique: true })
    cpf!: string;

    @Column()
    type!: string;

    @Column({ nullable: true })
    phone!: string;

    @Column({ nullable: true })
    ocupation!: string;

    @Column({ nullable: true })
    organization!: string;
    
    @OneToMany((type) => Authorizer, (authorizer) => authorizer.user)
    authorizer!: Authorizer[];

    @OneToMany((type) => Request, (request) => request.user)
    request!: Request[];
}

export default User; 
