import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createIngredientes1603332243498 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'ingredientes',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'cod_confeitaria',
                    type: 'integer',
                },
                {
                    name: 'ingrediente',
                    type: 'varchar',
                },
                {
                    name: 'quantidade',
                    type: 'integer',
                },
                {
                    name: 'unidade',
                    type: 'varchar',
                },
                {
                    name: 'preco',
                    type: 'decimal',
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('ingredientes');
    }

}