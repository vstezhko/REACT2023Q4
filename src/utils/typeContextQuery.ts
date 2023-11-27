import { ParsedUrlQuery } from 'querystring';
import { QueryParams } from "@/redux/slices/querySlice";

export const typeContextQuery = (query: ParsedUrlQuery): QueryParams => {
  return {
    ...query,
    page: Number(query.page),
    pageSize: Number(query.pageSize),
  };
};
