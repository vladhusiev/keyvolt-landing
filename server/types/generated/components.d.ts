import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksFeaturedArticles extends Struct.ComponentSchema {
  collectionName: 'components_blocks_featured_articles';
  info: {
    displayName: 'Featured Articles';
  };
  attributes: {
    article: Schema.Attribute.Relation<'oneToOne', 'api::blog.blog'>;
  };
}

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
      'blocks.featured-articles': BlocksFeaturedArticles;
      'feature-item.features': FeatureItemFeatures;
    }
  }
}
