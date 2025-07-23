import { signalStoreFeature, withState } from '@ngrx/signals';

type FilteringState = {
  filterTag: string | null;
};

export function withLinkFiltering() {
  return signalStoreFeature(
    withState<FilteringState>({
      filterTag: null,
    }),
  );
}

export function setFilterTag(tag: string): FilteringState {
  return { filterTag: tag };
}

export function clearFilteringTag(): FilteringState {
  return { filterTag: null };
}
