import type { Template } from 'sanity';

/**
 * Real-estate listing vocabulary — the ordered spec labels for a real-estate
 * listing. Array order = display order on the site.
 *
 * Deliberately independent of the automotive template: this list is not shared,
 * merged, or cross-referenced with AUTOMOTIVE_SPEC_LABELS.
 */
export const REAL_ESTATE_SPEC_LABELS: ReadonlyArray<{
  label: string;
  valueType: 'text' | 'number' | 'boolean' | 'date';
  unit?: string;
}> = [
  { label: 'Property Type', valueType: 'text' },
  { label: 'Bedrooms', valueType: 'number' },
  { label: 'Bathrooms', valueType: 'number' },
  { label: 'Car Spaces', valueType: 'number' },
  { label: 'Land Size', valueType: 'number', unit: 'sqm' },
  { label: 'Internal Size', valueType: 'number', unit: 'sqm' },
  { label: 'Year Built', valueType: 'number' },
  { label: 'Council Rates', valueType: 'text' },
  { label: 'Has Pool', valueType: 'boolean' },
  { label: 'Pet Friendly', valueType: 'boolean' },
];

const slugify = (label: string) =>
  label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Label slug + short random suffix — unique within the array and collision-safe
// even if an editor later duplicates a scaffolded row.
const detailKey = (label: string) => `${slugify(label)}-${Math.random().toString(36).slice(2, 8)}`;

const details = REAL_ESTATE_SPEC_LABELS.map((spec) => ({
  _key: detailKey(spec.label),
  _type: 'detail' as const,
  label: spec.label,
  valueType: spec.valueType,
  // unit only where the vocabulary specifies one; no value fields are set so
  // editors fill them in (booleans stay unset, not false).
  ...(spec.unit ? { unit: spec.unit } : {}),
}));

export const realEstateListingTemplate: Template = {
  id: 'listing-real-estate',
  title: 'Listing (Real Estate)',
  schemaType: 'listing',
  value: {
    category: 'real-estate',
    status: 'active',
    currency: 'AUD',
    details,
  },
};
