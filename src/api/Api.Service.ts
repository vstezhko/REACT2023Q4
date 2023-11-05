const API_URL = 'https://swapi.dev/api/';

const search = async (
  searchValue: string,
  page: number,
  searchType: string = 'people'
) => {
  try {
    const res = await fetch(
      `${API_URL}${searchType}/?search=${searchValue}&page=${page}`
    );
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

const getPerson = async (id: number) => {
  try {
    const res = await fetch(`${API_URL}people/${id}`);
    return await res.json();
  } catch (error) {
    console.log(error);
  }
};

export const ApiService = {
  search,
  getPerson,
};
