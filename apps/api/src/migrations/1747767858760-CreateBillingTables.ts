import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from "typeorm";

export class CreateBillingTables1747767858760 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // create plans table
        await queryRunner.createTable(
            new Table({
                name: "plans",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true, 
                        generationStrategy: "increment"
                    },
                    {
                        name: "stripe_plan_id",
                        type: "varchar",
                        length: "255",
                        isNullable: true
                    },
                    {
                        name: "name",
                        type: "varchar",
                        length: "255",
                        isNullable: false
                    },
                    {
                        name: "price",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                        isNullable: false
                    },
                    {
                        name: "currency",
                        type: "varchar",
                        length: "3",
                        isNullable: false,
                        default: "'USD'"
                    },
                    {
                        name: "interval",
                        type: "enum",
                        enum: ["month", "year"],
                        isNullable: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            }),
            true
        )

        await queryRunner.createIndex(
            "plans",
            new TableIndex({
                name: "IDX_PLANS_STRIPE_PLAN_ID",
                columnNames: ["stripe_plan_id"],
                isUnique: true
            })
        );

        // create subscriptions table
        await queryRunner.createTable(
            new Table({
                name: "subscriptions",
                columns: [
                     {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true, 
                        generationStrategy: "increment"
                    },
                    {
                        name: "stripe_subscription_id",
                        type: "varchar",
                        length: "255",
                        isNullable: true
                    },
                    {
                        name: "plan_id",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "status",
                        type: "enum",
                        enum: ["active", "trialing", "canceled", "past_due", "paused"],
                        isNullable: false,
                        default: "'trialing'"
                    },
                    {
                        name: "start_date",
                        type: "timestamp",
                        isNullable: false,
                        default: "now()"
                    },
                    {
                        name: "end_date",
                        type: "timestamp",
                        isNullable: true
                    },
                    {
                        name: "trial_end_date",
                        type: "timestamp",
                        isNullable: true
                    },
                    {
                        name: "canceled_at",
                        type: "timestamp",
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            }),
            true
        )

        await queryRunner.createIndex(
            "subscriptions",
            new TableIndex({
                name: "IDX_SUBSCRIPTIONS_STRIPE_ID",
                columnNames: ["stripe_subscription_id"],
                isUnique: true
            })
        )

        await queryRunner.createForeignKey(
            "subscriptions",
            new TableForeignKey({
                columnNames: ["plan_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "plans",
                onDelete: "RESTRICT" // Prevent deletion of plans that have active subscriptions
            })
        )

        // create organizations_subscriptions table
        await queryRunner.createTable(
            new Table({
                name: "organizations_subscriptions",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true, 
                        generationStrategy: "increment"
                    },
                    {
                        name: "organization_id",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "subscription_id",
                        type: "int",
                        isNullable: false
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            }),
            true
        )

        await queryRunner.createForeignKey(
            "organizations_subscriptions",
            new TableForeignKey({
                columnNames: ["organization_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "organizations",
                onDelete: "CASCADE" // If an organization is deleted, also delete its subscription associations
            })
        )

        await queryRunner.createForeignKey(
            "organizations_subscriptions",
            new TableForeignKey({
                columnNames: ["subscription_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "subscriptions",
                onDelete: "CASCADE" // If a subscription is deleted, also delete its organization associations
            })
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop foreign keys from organizations_subscriptions
        const orgSubsTable = await queryRunner.getTable("organizations_subscriptions")
        if (orgSubsTable) {
            for (const fk of orgSubsTable.foreignKeys) {
                await queryRunner.dropForeignKey("organizations_subscriptions", fk)
            }
        }

        // Drop organizations_subscriptions table
        await queryRunner.dropTable("organizations_subscriptions")

        // Drop foreign key from subscriptions (plan_id)
        const subsTable = await queryRunner.getTable("subscriptions")
        const planFK = subsTable?.foreignKeys.find(fk => fk.columnNames.includes("plan_id"))
        if (planFK) {
            await queryRunner.dropForeignKey("subscriptions", planFK)
        }

        // Drop subscriptions indexes
        await queryRunner.dropIndex("subscriptions", "IDX_SUBSCRIPTIONS_STRIPE_ID")

        // Drop subscriptions table
        await queryRunner.dropTable("subscriptions")

        // Drop plans indexes
        await queryRunner.dropIndex("plans", "IDX_PLANS_STRIPE_PLAN_ID")

        // Drop plans table
        await queryRunner.dropTable("plans")
    }

}
