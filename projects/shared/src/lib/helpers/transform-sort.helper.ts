import { Sort } from '@angular/material/sort';

export function transformSortToQueryString(sort: Sort): string {
  switch (sort.direction) {
    case 'asc':
      return `${sort.active}`;
    case 'desc':
      return `-${sort.active}`;
    default:
      return `${sort.active}`;
  }
}
