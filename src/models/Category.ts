import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'

export enum CategoryType {
    EXPENSE = "expense",
    REVENUE = "revenue",
}

import User from './User';

@Entity('categories')
export default class Category {
    
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    planned: string;

    @Column({
        type: "enum",
        enum: CategoryType,
    })
    type: CategoryType;

    @ManyToOne(type => User, user => user.categories)
    @JoinColumn()
    user: User;
    
}