import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany, JoinColumn} from 'typeorm'
import bcrypt  from 'bcryptjs';

import Category from './Category';
import Account from './Account';

@Entity('users')
export default class User {
    
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({
        default: false,
    })
    verifiedEmail: boolean;
    
    @Column({
        nullable: true,
    })
    lastIp: string;

    @Column()
    password: string;

    @OneToMany(type => Category, category => category.user)
    @JoinColumn()
    categories: Category[];
    
    @OneToMany(type => Account, account => account.user)
    @JoinColumn()
    accounts: Account[];

    @BeforeInsert()
        async beforeInsert() {
        this.password = await bcrypt.hash(this.password, 12);
    }

}