export const getFetch = (query = '', page = 1) => {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '20426626-1108d2b53bdb59840c18c2bd8';

  const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  return fetch(url).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`photo not found`));
  });
};
