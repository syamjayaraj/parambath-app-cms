import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAutoAuto extends Schema.CollectionType {
  collectionName: 'autos';
  info: {
    singularName: 'auto';
    pluralName: 'autos';
    displayName: 'Auto';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    phoneNumber: Attribute.String;
    phoneNumber2: Attribute.String;
    vehicleNumber: Attribute.String;
    images: Attribute.Media;
    auto_stand: Attribute.Relation<
      'api::auto.auto',
      'manyToOne',
      'api::auto-stand.auto-stand'
    >;
    ownerName: Attribute.String;
    nameMalayalam: Attribute.String;
    ownerNameMalayalam: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::auto.auto', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::auto.auto', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiAutoStandAutoStand extends Schema.CollectionType {
  collectionName: 'auto_stands';
  info: {
    singularName: 'auto-stand';
    pluralName: 'auto-stands';
    displayName: 'Auto Stand';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    autos: Attribute.Relation<
      'api::auto-stand.auto-stand',
      'oneToMany',
      'api::auto.auto'
    >;
    nameMalayalam: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::auto-stand.auto-stand',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::auto-stand.auto-stand',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBusRouteBusRoute extends Schema.CollectionType {
  collectionName: 'bus_routes';
  info: {
    singularName: 'bus-route';
    pluralName: 'bus-routes';
    displayName: 'Bus Route';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    bus_timings: Attribute.Relation<
      'api::bus-route.bus-route',
      'oneToMany',
      'api::bus-timing.bus-timing'
    >;
    name: Attribute.String;
    nameMalayalam: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::bus-route.bus-route',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::bus-route.bus-route',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBusTimingBusTiming extends Schema.CollectionType {
  collectionName: 'bus_timings';
  info: {
    singularName: 'bus-timing';
    pluralName: 'bus-timings';
    displayName: 'Bus Timing';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    bus_route: Attribute.Relation<
      'api::bus-timing.bus-timing',
      'manyToOne',
      'api::bus-route.bus-route'
    >;
    name: Attribute.String;
    nameMalayalam: Attribute.String;
    time: Attribute.Time;
    phoneNumber: Attribute.String;
    images: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::bus-timing.bus-timing',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::bus-timing.bus-timing',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBusinessBusiness extends Schema.CollectionType {
  collectionName: 'businesses';
  info: {
    singularName: 'business';
    pluralName: 'businesses';
    displayName: 'Business';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    business_category: Attribute.Relation<
      'api::business.business',
      'manyToOne',
      'api::business-category.business-category'
    >;
    name: Attribute.String;
    nameMalayalam: Attribute.String;
    about: Attribute.Text;
    ownerName: Attribute.String;
    ownerNameMalayalam: Attribute.String;
    phoneNumber: Attribute.String;
    phoneNumber2: Attribute.String;
    timing: Attribute.Component<'business.timing', true>;
    place: Attribute.String;
    address: Attribute.Text;
    email: Attribute.String;
    website: Attribute.String;
    whatsapp: Attribute.String;
    facebook: Attribute.String;
    instagram: Attribute.String;
    youtube: Attribute.String;
    onlineBookingUrl: Attribute.String;
    upi: Attribute.Boolean & Attribute.DefaultTo<false>;
    card: Attribute.Boolean & Attribute.DefaultTo<false>;
    onlineDelivery: Attribute.Boolean & Attribute.DefaultTo<false>;
    images: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::business.business',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::business.business',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBusinessCategoryBusinessCategory
  extends Schema.CollectionType {
  collectionName: 'business_categories';
  info: {
    singularName: 'business-category';
    pluralName: 'business-categories';
    displayName: 'Business Category';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    nameMalayalam: Attribute.String;
    businesses: Attribute.Relation<
      'api::business-category.business-category',
      'oneToMany',
      'api::business.business'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::business-category.business-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::business-category.business-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContributorContributor extends Schema.CollectionType {
  collectionName: 'contributors';
  info: {
    singularName: 'contributor';
    pluralName: 'contributors';
    displayName: 'Contributor';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    icon: Attribute.Media;
    images: Attribute.Media;
    role: Attribute.String;
    instagram: Attribute.String;
    facebook: Attribute.String;
    phoneNumber: Attribute.String;
    phoneNumber2: Attribute.String;
    email: Attribute.String;
    whatsapp: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contributor.contributor',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::contributor.contributor',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEmergencyEmergency extends Schema.CollectionType {
  collectionName: 'emergencies';
  info: {
    singularName: 'emergency';
    pluralName: 'emergencies';
    displayName: 'Emergency';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    emergency_category: Attribute.Relation<
      'api::emergency.emergency',
      'manyToOne',
      'api::emergency-category.emergency-category'
    >;
    name: Attribute.String;
    nameMalayalam: Attribute.String;
    ownerName: Attribute.String;
    ownerNameMalayalam: Attribute.String;
    about: Attribute.Text;
    phoneNumber: Attribute.String;
    phoneNumber2: Attribute.String;
    email: Attribute.String;
    website: Attribute.String;
    place: Attribute.String;
    address: Attribute.Text;
    whatsapp: Attribute.String;
    facebook: Attribute.String;
    instagram: Attribute.String;
    youtube: Attribute.String;
    images: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::emergency.emergency',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::emergency.emergency',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEmergencyCategoryEmergencyCategory
  extends Schema.CollectionType {
  collectionName: 'emergency_categories';
  info: {
    singularName: 'emergency-category';
    pluralName: 'emergency-categories';
    displayName: 'Emergency Category';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    nameMalayalam: Attribute.String;
    emergencies: Attribute.Relation<
      'api::emergency-category.emergency-category',
      'oneToMany',
      'api::emergency.emergency'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::emergency-category.emergency-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::emergency-category.emergency-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEventEvent extends Schema.CollectionType {
  collectionName: 'events';
  info: {
    singularName: 'event';
    pluralName: 'events';
    displayName: 'Event';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    event_category: Attribute.Relation<
      'api::event.event',
      'manyToOne',
      'api::event-category.event-category'
    >;
    name: Attribute.String;
    nameMalayalam: Attribute.String;
    about: Attribute.Text;
    from: Attribute.Date;
    to: Attribute.Date;
    phoneNumber: Attribute.String;
    phoneNumber2: Attribute.String;
    email: Attribute.String;
    website: Attribute.String;
    whatsapp: Attribute.String;
    facebook: Attribute.String;
    instagram: Attribute.String;
    youtube: Attribute.String;
    schedule: Attribute.Component<'event.schedule', true>;
    images: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::event.event',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::event.event',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEventCategoryEventCategory extends Schema.CollectionType {
  collectionName: 'event_categories';
  info: {
    singularName: 'event-category';
    pluralName: 'event-categories';
    displayName: 'Event Category';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    nameMalayalam: Attribute.String;
    events: Attribute.Relation<
      'api::event-category.event-category',
      'oneToMany',
      'api::event.event'
    >;
    icon: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::event-category.event-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::event-category.event-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiHelpHelp extends Schema.CollectionType {
  collectionName: 'helps';
  info: {
    singularName: 'help';
    pluralName: 'helps';
    displayName: 'Help';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    content: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::help.help', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::help.help', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiMoreMore extends Schema.CollectionType {
  collectionName: 'mores';
  info: {
    singularName: 'more';
    pluralName: 'mores';
    displayName: 'More';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    more_category: Attribute.Relation<
      'api::more.more',
      'manyToOne',
      'api::more-category.more-category'
    >;
    name: Attribute.String;
    nameMalayalam: Attribute.String;
    content: Attribute.Blocks;
    label: Attribute.String;
    video: Attribute.String;
    url: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::more.more', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::more.more', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiMoreCategoryMoreCategory extends Schema.CollectionType {
  collectionName: 'more_categories';
  info: {
    singularName: 'more-category';
    pluralName: 'more-categories';
    displayName: 'More Category';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    nameMalayalam: Attribute.String;
    icon: Attribute.Media;
    mores: Attribute.Relation<
      'api::more-category.more-category',
      'oneToMany',
      'api::more.more'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::more-category.more-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::more-category.more-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOnlineServiceOnlineService extends Schema.CollectionType {
  collectionName: 'online_services';
  info: {
    singularName: 'online-service';
    pluralName: 'online-services';
    displayName: 'Online Service';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    online_service_category: Attribute.Relation<
      'api::online-service.online-service',
      'manyToOne',
      'api::online-service-category.online-service-category'
    >;
    name: Attribute.String;
    nameMalayalam: Attribute.String;
    about: Attribute.Text;
    email: Attribute.String;
    phoneNumber: Attribute.String;
    phoneNumber2: Attribute.String;
    url: Attribute.String;
    facebook: Attribute.String;
    instagram: Attribute.String;
    youtube: Attribute.String;
    whatsapp: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::online-service.online-service',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::online-service.online-service',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOnlineServiceCategoryOnlineServiceCategory
  extends Schema.CollectionType {
  collectionName: 'online_service_categories';
  info: {
    singularName: 'online-service-category';
    pluralName: 'online-service-categories';
    displayName: 'Online Service Category';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    nameMalayalam: Attribute.String;
    online_services: Attribute.Relation<
      'api::online-service-category.online-service-category',
      'oneToMany',
      'api::online-service.online-service'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::online-service-category.online-service-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::online-service-category.online-service-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRepresentativeRepresentative extends Schema.CollectionType {
  collectionName: 'representatives';
  info: {
    singularName: 'representative';
    pluralName: 'representatives';
    displayName: 'Representative';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    nameMalayalam: Attribute.String;
    about: Attribute.Text;
    phoneNumber: Attribute.String;
    phoneNumber2: Attribute.String;
    place: Attribute.String;
    address: Attribute.Text;
    email: Attribute.String;
    website: Attribute.String;
    facebook: Attribute.String;
    instagram: Attribute.String;
    whatsapp: Attribute.String;
    youtube: Attribute.String;
    images: Attribute.Media;
    representative_category: Attribute.Relation<
      'api::representative.representative',
      'manyToOne',
      'api::representative-category.representative-category'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::representative.representative',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::representative.representative',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiRepresentativeCategoryRepresentativeCategory
  extends Schema.CollectionType {
  collectionName: 'representative_categories';
  info: {
    singularName: 'representative-category';
    pluralName: 'representative-categories';
    displayName: 'Representative Category';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    nameMalayalam: Attribute.String;
    representatives: Attribute.Relation<
      'api::representative-category.representative-category',
      'oneToMany',
      'api::representative.representative'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::representative-category.representative-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::representative-category.representative-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSettingSetting extends Schema.SingleType {
  collectionName: 'settings';
  info: {
    singularName: 'setting';
    pluralName: 'settings';
    displayName: 'Setting';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    phoneNumber: Attribute.String;
    phoneNumber2: Attribute.String;
    email: Attribute.String;
    whatsapp: Attribute.String;
    facebook: Attribute.String;
    instagram: Attribute.String;
    youtube: Attribute.String;
    helpVideo: Attribute.String;
    appUrlAndroid: Attribute.String;
    appUrlIos: Attribute.String;
    address: Attribute.Text;
    about: Attribute.Text;
    icon: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::setting.setting',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::setting.setting',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSliderEventSliderEvent extends Schema.CollectionType {
  collectionName: 'slider_events';
  info: {
    singularName: 'slider-event';
    pluralName: 'slider-events';
    displayName: 'Slider Event';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    image: Attribute.Media;
    event: Attribute.Relation<
      'api::slider-event.slider-event',
      'oneToOne',
      'api::event.event'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::slider-event.slider-event',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::slider-event.slider-event',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSliderHomeSliderHome extends Schema.CollectionType {
  collectionName: 'slider_homes';
  info: {
    singularName: 'slider-home';
    pluralName: 'slider-homes';
    displayName: 'Slider Home';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    image: Attribute.Media;
    business: Attribute.Relation<
      'api::slider-home.slider-home',
      'oneToOne',
      'api::business.business'
    >;
    auto: Attribute.Relation<
      'api::slider-home.slider-home',
      'oneToOne',
      'api::auto.auto'
    >;
    emergency: Attribute.Relation<
      'api::slider-home.slider-home',
      'oneToOne',
      'api::emergency.emergency'
    >;
    small_business: Attribute.Relation<
      'api::slider-home.slider-home',
      'oneToOne',
      'api::small-business.small-business'
    >;
    online_service: Attribute.Relation<
      'api::slider-home.slider-home',
      'oneToOne',
      'api::online-service.online-service'
    >;
    worker: Attribute.Relation<
      'api::slider-home.slider-home',
      'oneToOne',
      'api::worker.worker'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::slider-home.slider-home',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::slider-home.slider-home',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSmallBusinessSmallBusiness extends Schema.CollectionType {
  collectionName: 'small_businesses';
  info: {
    singularName: 'small-business';
    pluralName: 'small-businesses';
    displayName: 'Small Business';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    small_business_category: Attribute.Relation<
      'api::small-business.small-business',
      'manyToOne',
      'api::small-business-category.small-business-category'
    >;
    name: Attribute.String;
    nameMalayalam: Attribute.String;
    about: Attribute.Text;
    ownerName: Attribute.String;
    ownerNameMalayalam: Attribute.String;
    phoneNumber: Attribute.String;
    phoneNumber2: Attribute.String;
    timing: Attribute.Component<'business.timing', true>;
    place: Attribute.String;
    address: Attribute.Text;
    email: Attribute.String;
    website: Attribute.String;
    facebook: Attribute.String;
    instagram: Attribute.String;
    whatsapp: Attribute.String;
    onlineBookingUrl: Attribute.String;
    youtube: Attribute.String;
    upi: Attribute.Boolean;
    card: Attribute.Boolean;
    onlineDelivery: Attribute.Boolean;
    images: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::small-business.small-business',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::small-business.small-business',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSmallBusinessCategorySmallBusinessCategory
  extends Schema.CollectionType {
  collectionName: 'small_business_categories';
  info: {
    singularName: 'small-business-category';
    pluralName: 'small-business-categories';
    displayName: 'Small Business Category';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    nameMalayalam: Attribute.String;
    small_businesses: Attribute.Relation<
      'api::small-business-category.small-business-category',
      'oneToMany',
      'api::small-business.small-business'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::small-business-category.small-business-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::small-business-category.small-business-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTermTerm extends Schema.SingleType {
  collectionName: 'terms';
  info: {
    singularName: 'term';
    pluralName: 'terms';
    displayName: 'Term';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    content: Attribute.Blocks;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::term.term', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::term.term', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiVehicleVehicle extends Schema.CollectionType {
  collectionName: 'vehicles';
  info: {
    singularName: 'vehicle';
    pluralName: 'vehicles';
    displayName: 'Vehicle';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    vehicle_category: Attribute.Relation<
      'api::vehicle.vehicle',
      'manyToOne',
      'api::vehicle-category.vehicle-category'
    >;
    name: Attribute.String;
    nameMalayalam: Attribute.String;
    about: Attribute.Text;
    ownerName: Attribute.String;
    ownerNameMalayalam: Attribute.String;
    phoneNumber: Attribute.String;
    phoneNumber2: Attribute.String;
    whatsapp: Attribute.String;
    images: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::vehicle.vehicle',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::vehicle.vehicle',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiVehicleCategoryVehicleCategory
  extends Schema.CollectionType {
  collectionName: 'vehicle_categories';
  info: {
    singularName: 'vehicle-category';
    pluralName: 'vehicle-categories';
    displayName: 'Vehicle Category';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    nameMalayalam: Attribute.String;
    vehicles: Attribute.Relation<
      'api::vehicle-category.vehicle-category',
      'oneToMany',
      'api::vehicle.vehicle'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::vehicle-category.vehicle-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::vehicle-category.vehicle-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWorkWork extends Schema.CollectionType {
  collectionName: 'works';
  info: {
    singularName: 'work';
    pluralName: 'works';
    displayName: 'Work';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    nameMalayalam: Attribute.String;
    workers: Attribute.Relation<
      'api::work.work',
      'oneToMany',
      'api::worker.worker'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::work.work', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::work.work', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiWorkerWorker extends Schema.CollectionType {
  collectionName: 'workers';
  info: {
    singularName: 'worker';
    pluralName: 'workers';
    displayName: 'Worker';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    work: Attribute.Relation<
      'api::worker.worker',
      'manyToOne',
      'api::work.work'
    >;
    name: Attribute.String;
    about: Attribute.Text;
    address: Attribute.Text;
    place: Attribute.String;
    phoneNumber: Attribute.String;
    phoneNumber2: Attribute.String;
    whatsapp: Attribute.String;
    instagram: Attribute.String;
    facebook: Attribute.String;
    website: Attribute.String;
    nameMalayalam: Attribute.String;
    images: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::worker.worker',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::worker.worker',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::auto.auto': ApiAutoAuto;
      'api::auto-stand.auto-stand': ApiAutoStandAutoStand;
      'api::bus-route.bus-route': ApiBusRouteBusRoute;
      'api::bus-timing.bus-timing': ApiBusTimingBusTiming;
      'api::business.business': ApiBusinessBusiness;
      'api::business-category.business-category': ApiBusinessCategoryBusinessCategory;
      'api::contributor.contributor': ApiContributorContributor;
      'api::emergency.emergency': ApiEmergencyEmergency;
      'api::emergency-category.emergency-category': ApiEmergencyCategoryEmergencyCategory;
      'api::event.event': ApiEventEvent;
      'api::event-category.event-category': ApiEventCategoryEventCategory;
      'api::help.help': ApiHelpHelp;
      'api::more.more': ApiMoreMore;
      'api::more-category.more-category': ApiMoreCategoryMoreCategory;
      'api::online-service.online-service': ApiOnlineServiceOnlineService;
      'api::online-service-category.online-service-category': ApiOnlineServiceCategoryOnlineServiceCategory;
      'api::representative.representative': ApiRepresentativeRepresentative;
      'api::representative-category.representative-category': ApiRepresentativeCategoryRepresentativeCategory;
      'api::setting.setting': ApiSettingSetting;
      'api::slider-event.slider-event': ApiSliderEventSliderEvent;
      'api::slider-home.slider-home': ApiSliderHomeSliderHome;
      'api::small-business.small-business': ApiSmallBusinessSmallBusiness;
      'api::small-business-category.small-business-category': ApiSmallBusinessCategorySmallBusinessCategory;
      'api::term.term': ApiTermTerm;
      'api::vehicle.vehicle': ApiVehicleVehicle;
      'api::vehicle-category.vehicle-category': ApiVehicleCategoryVehicleCategory;
      'api::work.work': ApiWorkWork;
      'api::worker.worker': ApiWorkerWorker;
    }
  }
}
