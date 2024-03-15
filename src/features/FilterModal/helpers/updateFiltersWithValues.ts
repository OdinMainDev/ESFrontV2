import { IFilterItem } from '../models/filter';

export const updateFiltersWithValues = (
  filters: IFilterItem[],
  filterNames: string[],
  filterValues: string[],
): IFilterItem[] => {
  return filters.map((filter) => {
    const index = filterNames.indexOf(filter.name);
    if (index !== -1) {
      return {
        ...filter,
        values: filterValues[index],
      };
    }
    return filter;
  });
};
