import * as migration_20261019_121140_initial from './20261019_121140_initial';
import * as migration_20261019_190500_localized_fields from './20261019_190500_localized_fields';
import * as migration_20261019_214500_enabled_status from './20261019_214500_enabled_status';
import * as migration_20261020_media_alt_en_ar from './20261020_media_alt_en_ar';
import * as migration_20261020_bilingual_en_ar_from_locales from './20261020_bilingual_en_ar_from_locales';
import * as migration_20261020_fix_contact_form_columns from './20261020_fix_contact_form_columns';
import * as migration_20261020_site_pages from './20261020_site_pages';

export const migrations = [
  {
    up: migration_20261019_121140_initial.up,
    down: migration_20261019_121140_initial.down,
    name: '20261019_121140_initial'
  },
  {
    up: migration_20261019_190500_localized_fields.up,
    down: migration_20261019_190500_localized_fields.down,
    name: '20261019_190500_localized_fields'
  },
  {
    up: migration_20261019_214500_enabled_status.up,
    down: migration_20261019_214500_enabled_status.down,
    name: '20261019_214500_enabled_status'
  },
  {
    up: migration_20261020_media_alt_en_ar.up,
    down: migration_20261020_media_alt_en_ar.down,
    name: '20261020_media_alt_en_ar'
  },
  {
    up: migration_20261020_bilingual_en_ar_from_locales.up,
    down: migration_20261020_bilingual_en_ar_from_locales.down,
    name: '20261020_bilingual_en_ar_from_locales'
  },
  {
    up: migration_20261020_fix_contact_form_columns.up,
    down: migration_20261020_fix_contact_form_columns.down,
    name: '20261020_fix_contact_form_columns'
  },
  {
    up: migration_20261020_site_pages.up,
    down: migration_20261020_site_pages.down,
    name: '20261020_site_pages'
  },
];
