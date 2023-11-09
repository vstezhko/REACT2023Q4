const API_URL = 'https://api.potterdb.com/v1/';

const search = async (
  searchValue: string,
  page: number,
  pageSize: number = 10,
  searchType: string = 'characters'
) => {
  try {
    const res = await fetch(
      `${API_URL}${searchType}/?filter[name_cont]=${searchValue}&page[number]=${page}&page[size]=${pageSize}`
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
