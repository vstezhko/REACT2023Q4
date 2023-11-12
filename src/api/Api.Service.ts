const API_URL = 'https://api.potterdb.com/v1/';

interface SearchParams {
  searchValue: string;
  page: number;
  pageSize?: number;
}

const search = async ({ searchValue, page, pageSize }: SearchParams) => {
  const defaultPageSize = 10;
  try {
    const res = await fetch(
      `${API_URL}characters/?filter[name_cont]=${searchValue}&page[number]=${page}&page[size]=${
        pageSize || defaultPageSize
      }`
    );
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};
const getCharacter = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}characters/${id}`);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const ApiService = {
  search,
  getCharacter,
};
