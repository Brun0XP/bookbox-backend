import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn} from 'typeorm'

export enum AccountType {
    CORRENTe = "corrente",
    POUPANCA = "poupança",
    PAGAMENTOS = "pagamentos",
    INVESTIMENTOS = "investimentos",
    OUTROS = "outros",
}

import Transaction from './Transaction'
import User from './User'

@Entity('accounts')
export default class Account {
    
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column({
        nullable: true,
    })
    description: string;

    @Column({
        type: "enum",
        enum: AccountType,
    })
    type: AccountType;

    @ManyToOne(type => User, user => user.accounts)
    @JoinColumn()
    user: User;

    @OneToMany(type => Transaction, transaction => transaction.account)
    @JoinColumn()
    transactions: Transaction[];

}