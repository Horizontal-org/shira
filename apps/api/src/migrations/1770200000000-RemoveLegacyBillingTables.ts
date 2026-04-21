import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveLegacyBillingTables1770200000000 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const orgSubsTable = await queryRunner.getTable("organizations_subscriptions");
        if (orgSubsTable) {
            for (const fk of orgSubsTable.foreignKeys) {
                await queryRunner.dropForeignKey("organizations_subscriptions", fk);
            }

            await queryRunner.dropTable("organizations_subscriptions");
        }

        const subscriptionsTable = await queryRunner.getTable("subscriptions");
        if (subscriptionsTable) {
            for (const fk of subscriptionsTable.foreignKeys) {
                await queryRunner.dropForeignKey("subscriptions", fk);
            }

            const stripeIdIndex = subscriptionsTable.indices.find(
                (index) => index.name === "IDX_SUBSCRIPTIONS_STRIPE_ID",
            );
            if (stripeIdIndex) {
                await queryRunner.dropIndex("subscriptions", "IDX_SUBSCRIPTIONS_STRIPE_ID");
            }

            await queryRunner.dropTable("subscriptions");
        }

        const plansTable = await queryRunner.getTable("plans");
        if (plansTable) {
            const stripePlanIndex = plansTable.indices.find(
                (index) => index.name === "IDX_PLANS_STRIPE_PLAN_ID",
            );
            if (stripePlanIndex) {
                await queryRunner.dropIndex("plans", "IDX_PLANS_STRIPE_PLAN_ID");
            }

            await queryRunner.dropTable("plans");
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE plans (
                id int NOT NULL AUTO_INCREMENT,
                stripe_plan_id varchar(255) NULL,
                name varchar(255) NOT NULL,
                price decimal(10,2) NOT NULL,
                currency varchar(3) NOT NULL DEFAULT 'USD',
                \`interval\` enum ('month', 'year') NOT NULL,
                created_at timestamp NOT NULL DEFAULT now(),
                updated_at timestamp NOT NULL DEFAULT now(),
                PRIMARY KEY (id),
                UNIQUE KEY IDX_PLANS_STRIPE_PLAN_ID (stripe_plan_id)
            )
        `);

        await queryRunner.query(`
            CREATE TABLE subscriptions (
                id int NOT NULL AUTO_INCREMENT,
                stripe_subscription_id varchar(255) NULL,
                plan_id int NOT NULL,
                status enum ('active', 'trialing', 'canceled', 'past_due', 'paused') NOT NULL DEFAULT 'trialing',
                start_date timestamp NOT NULL DEFAULT now(),
                end_date timestamp NULL,
                trial_end_date timestamp NULL,
                canceled_at timestamp NULL,
                created_at timestamp NOT NULL DEFAULT now(),
                updated_at timestamp NOT NULL DEFAULT now(),
                PRIMARY KEY (id),
                UNIQUE KEY IDX_SUBSCRIPTIONS_STRIPE_ID (stripe_subscription_id),
                CONSTRAINT FK_SUBSCRIPTIONS_PLAN_ID FOREIGN KEY (plan_id) REFERENCES plans(id) ON DELETE RESTRICT
            )
        `);

        await queryRunner.query(`
            CREATE TABLE organizations_subscriptions (
                id int NOT NULL AUTO_INCREMENT,
                organization_id int NOT NULL,
                subscription_id int NOT NULL,
                created_at timestamp NOT NULL DEFAULT now(),
                updated_at timestamp NOT NULL DEFAULT now(),
                PRIMARY KEY (id),
                CONSTRAINT FK_ORGANIZATION_SUBSCRIPTIONS_ORG FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE CASCADE,
                CONSTRAINT FK_ORGANIZATION_SUBSCRIPTIONS_SUB FOREIGN KEY (subscription_id) REFERENCES subscriptions(id) ON DELETE CASCADE
            )
        `);
    }
}
