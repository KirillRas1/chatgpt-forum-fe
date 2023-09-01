import { inPlaceSort, sort } from 'fast-sort';

export const sortById = items => sort(items).desc(item => item.id);
export const sortByScore = items => sort(items).desc(item => item.total_score);
