import type { StrapiApp } from '@strapi/strapi/admin';

import logo from './extensions/logo.png';

// Danksradar branding for the admin panel
export default {
  config: {
    auth: { logo },
    menu: { logo },
    head: { favicon: logo },
    tutorials: false,
    notifications: { releases: false },
    translations: {
      en: {
        'Auth.form.welcome.title': 'Danksradar admin',
        'Auth.form.welcome.subtitle': 'Sign in to manage the website',
      },
    },
    theme: {
      light: {
        colors: {
          primary100: '#F3EEFF',
          primary200: '#E4D4FF',
          primary500: '#A259FF',
          primary600: '#8A3FF0',
          primary700: '#6E2BD0',
          buttonPrimary500: '#A259FF',
          buttonPrimary600: '#8A3FF0',
        },
      },
    },
  },
  bootstrap(_app: StrapiApp) {},
};
