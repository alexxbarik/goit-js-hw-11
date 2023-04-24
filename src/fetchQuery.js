import axios from "axios";
const KEY = `35608901-9a3da3088de3be87b67ce1f50`;
const BASE_URL = `https://pixabay.com/api/`;




export default async function fetchQuery(searchQuery, page) {
      const per_Page = 3;
      const response = await axios.get(`${BASE_URL}?key=${KEY}&q=${searchQuery}
      &image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${per_Page}`);
      return response.data;
    
    
  }

