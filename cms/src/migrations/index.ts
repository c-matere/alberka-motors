import * as migration_20261123_125134 from './20261123_125134';
import * as migration_20261123_150000 from './20261123_150000_add_bot_publish_fields';
import * as migration_20261127_125000 from './20261127_125000_add_live_chat';

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
  {
    up: migration_20261127_125000.up,
    down: migration_20261127_125000.down,
    name: '20261127_125000_add_live_chat'
  },
];
