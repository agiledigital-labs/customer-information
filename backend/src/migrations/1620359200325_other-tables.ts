/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

const crmTable = (name: string) => ({ schema: 'listings', name });

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable(
    crmTable('employment'),
    {
      id: {
        type: 'uuid',
        primaryKey: true,
        default: pgm.func('gen_random_uuid()'),
        unique: true,
      },
      user_id: {
        type: 'uuid',
        notNull: true,
      },
      organisation_id: {
        type: 'uuid',
        notNull: true,
      },
      start_date: {
        type: 'timestamp',
        notNull: true,
      },
      end_date: {
        type: 'timestamp',
      },
    },
    {
      constraints: {
        foreignKeys: [
          {
            references: 'listings.people(id)',
            columns: 'user_id',
            onDelete: 'CASCADE',
          },
          {
            references: 'listings.organisation(id)',
            columns: 'organisation_id',
            onDelete: 'CASCADE',
          },
        ],
      },
    }
  );

  pgm.sql('GRANT SELECT, INSERT, UPDATE on listings.employment TO standard');
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql('REVOKE SELECT,INSERT, UPDATE on listings.employment FROM standard');

  pgm.dropTable('employment');
}
