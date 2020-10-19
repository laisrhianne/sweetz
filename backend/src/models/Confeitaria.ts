import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';

@Entity('confeitarias')
export default class Confeitaria {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    nome: string;

    @Column()
    cpf: number;

    @Column()
    nome_negocio: string;

    @Column()
    cnpj: number;

    @Column()
    descricao: string;

    @Column()
    telefone: number;

    @Column()
    rua: string;

    @Column()
    numero: number;

    @Column()
    complemento: string;

    @Column()
    bairro: string;

    @Column()
    cidade: string;

    @Column()
    estado: string;

    @Column()
    logo_path: string;
}