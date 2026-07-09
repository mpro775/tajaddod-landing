/**
 * Signature Product Type
 *
 * Used to represent curated showcase products displayed
 * as part of brand scenes (hotspot boards), NOT as store items.
 *
 * No prices, no buy buttons, no cart references.
 */
export type SignatureProduct = {
  /** Unique identifier (matches store product id when available) */
  id: string;
  /** Brand owner of this product */
  brand: 'nader' | 'cnc' | 'liper';
  /** Arabic product name */
  nameAr: string;
  /** Optional English product name / model number */
  nameEn?: string;
  /** Arabic category label */
  categoryAr: string;
  /** One-line Arabic description for hotspot tooltip */
  shortDescriptionAr: string;
  /** Path to product image asset */
  image: string;
  /** Hotspot position (percentage-based for responsive layout) */
  hotspot: {
    /** Horizontal position as percentage (0–100) from right edge (RTL) */
    x: number;
    /** Vertical position as percentage (0–100) from top edge */
    y: number;
  };
};

export type BrandBoard = {
  /** Brand identifier */
  brand: 'nader' | 'cnc' | 'liper';
  /** Board title in Arabic */
  titleAr: string;
  /** Board description in Arabic */
  descriptionAr: string;
  /** Background scene image path */
  sceneImage: string;
  /** Products displayed on this board */
  products: SignatureProduct[];
};
