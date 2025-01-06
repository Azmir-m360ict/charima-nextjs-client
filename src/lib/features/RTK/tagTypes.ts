const tagKeys = [
  'COMMON',
  'ADDRESS',
  'ADDRESS-SELECT',
  'ORDER',
  'REVIEW',
  'PROFILE',
  'PRODUCT_TABS',
  'PRODUCT_SEARCH',
] as const;

export const TagTypes = Object.fromEntries(
  tagKeys.map((key) => [key, key])
) as { [K in (typeof tagKeys)[number]]: K };

export type TagType = (typeof TagTypes)[keyof typeof TagTypes];

export type Tag = {
  type: TagType;
  id: `${TagType}_ID`;
};

export function createTag(type: TagType): Tag {
  return {
    type,
    id: `${type}_ID`,
  };
}
