/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

const crmTable = (name: string) => ({ schema: 'listings', name });

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable(crmTable('people'), {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
    },
    first_name: {
      type: 'name',
      notNull: true,
    },
    last_name: {
      type: 'name',
      notNull: true,
    },
    email: {
      type: 'text',
    },
    phone: {
      type: 'text',
    },
  });

  pgm.createTable(
    crmTable('notes'),
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
      note: {
        type: 'text',
        notNull: true,
      },
      timestamp: {
        type: 'timestamp',
        default: pgm.func('current_timestamp'),
      },
    },
    {
      constraints: {
        foreignKeys: [{ references: 'listings.people(id)', columns: 'user_id' }],
      },
    }
  );

  pgm.createTable(crmTable('organisation'), {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('gen_random_uuid()'),
      unique: true,
    },
    name: {
      type: 'text',
      notNull: true,
    },
    address: {
      type: 'text',
    },
  });

  pgm.sql('GRANT SELECT, INSERT, UPDATE on listings.people TO standard');
  pgm.sql('GRANT SELECT, INSERT, UPDATE on listings.notes TO standard');
  pgm.sql('GRANT SELECT, INSERT, UPDATE on listings.organisation TO standard');
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql('REVOKE SELECT,INSERT, UPDATE on listings.people FROM standard');
  pgm.sql('REVOKE SELECT,INSERT, UPDATE on listings.notes FROM standard');
  pgm.sql(
    'REVOKE SELECT,INSERT, UPDATE on listings.organisation FROM standard'
  );

  pgm.dropTable('organisation');
  pgm.dropTable('notes');
  pgm.dropTable('people');
}
