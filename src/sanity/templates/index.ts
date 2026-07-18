import type { Template } from 'sanity';
import { automotiveListingTemplate } from './automotive';
import { realEstateListingTemplate } from './realEstate';

// The two listing creation templates, registered alongside Sanity's defaults.
export const listingTemplates: Template[] = [
  automotiveListingTemplate,
  realEstateListingTemplate,
];
