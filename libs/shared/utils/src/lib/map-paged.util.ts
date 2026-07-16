import { PagedResult } from '@ssrk/shared/types';

export function mapPaged<TIn, TOut>(
  page: PagedResult<TIn>,
  mapItem: (item: TIn) => TOut,
): PagedResult<TOut> {
  return {
    items: page.items.map(mapItem),
    totalCount: page.totalCount,
    page: page.page,
    pageSize: page.pageSize,
  };
}
