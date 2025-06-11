import type { Schema, Struct } from '@strapi/strapi';

export interface FeatureItemFeatures extends Struct.ComponentSchema {
  collectionName: 'components_feature_item_features';
  info: {
    displayName: 'Features';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    text: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'feature-item.features': FeatureItemFeatures;
    }
  }
}
