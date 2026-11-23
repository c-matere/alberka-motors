import * as migration_20261123_125134 from './20261123_125134';
import * as migration_20261123_150000 from './20261123_150000_add_bot_publish_fields';

export const migrations = [
  {
    up: migration_20261123_125134.up,
    down: migration_20261123_125134.down,
    name: '20261123_125134'
  },
  {
    up: migration_20261123_150000.up,
    down: migration_20261123_150000.down,
    name: '20261123_150000'
  },
];
