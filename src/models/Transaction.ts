import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm'

export enum TransactionType {
    EXPENSE = "expense",
    REVENUE = "revenue",
}

import Account from "./Account";
import Category from "./Category";

@Entity('transactions')
export default class Transaction {
    
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: "enum",
        enum: TransactionType,
    })
    type: TransactionType;

    @Column()
    date: Date;

    @Column()
    amount: number;

    @Column()
    description: string;

    @ManyToOne(type => Account, account => account.transactions)
    @JoinColumn()
    account: Account

    @ManyToOne(type => Category)
    category: Category
    
}