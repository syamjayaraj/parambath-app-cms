import type { Schema, Attribute } from '@strapi/strapi';

export interface BusinessTiming extends Schema.Component {
  collectionName: 'components_business_timings';
  info: {
    displayName: 'timing';
    icon: 'clock';
    description: '';
  };
  attributes: {
    opensAt: Attribute.Time & Attribute.DefaultTo<'09:00'>;
    closesAt: Attribute.Time & Attribute.DefaultTo<'18:00'>;
    day: Attribute.Enumeration<
      [
        'All Days',
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]
    > &
      Attribute.DefaultTo<'All Days'>;
  };
}

export interface CommonName extends Schema.Component {
  collectionName: 'components_common_names';
  info: {
    displayName: 'name';
    icon: 'earth';
  };
  attributes: {
    english: Attribute.String;
    malayalam: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'business.timing': BusinessTiming;
      'common.name': CommonName;
    }
  }
}
