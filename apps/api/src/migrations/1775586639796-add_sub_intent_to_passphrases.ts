import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddSubIntentToPassphrases1775586639796 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "passphrases",
            new TableColumn({
                name: 'subscription_intent',
                type: "enum",
                enum: ["starter", "pro", "enterprise"],
                default: "'starter'",
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('passphrases', "subscription_intent")
    }
     

}
