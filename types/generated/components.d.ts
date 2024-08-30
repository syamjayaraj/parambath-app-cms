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

export interface CommonTitleDescription extends Schema.Component {
  collectionName: 'components_common_title_descriptions';
  info: {
    displayName: 'titleDescription';
    icon: 'apps';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
  };
}

export interface ContestOption extends Schema.Component {
  collectionName: 'components_contest_options';
  info: {
    displayName: 'option';
    icon: 'arrowRight';
  };
  attributes: {
    title: Attribute.String;
    correct: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

export interface EventScheduleDay extends Schema.Component {
  collectionName: 'components_event_schedule_days';
  info: {
    displayName: 'scheduleDay';
    icon: 'arrowRight';
  };
  attributes: {
    time: Attribute.String;
    title: Attribute.String;
    description: Attribute.Text;
  };
}

export interface EventSchedule extends Schema.Component {
  collectionName: 'components_event_schedules';
  info: {
    displayName: 'schedule';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    day: Attribute.String;
    scheduleDay: Attribute.Component<'event.schedule-day', true>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'business.timing': BusinessTiming;
      'common.name': CommonName;
      'common.title-description': CommonTitleDescription;
      'contest.option': ContestOption;
      'event.schedule-day': EventScheduleDay;
      'event.schedule': EventSchedule;
    }
  }
}
