import axios from "axios";

export const requesImageSearch = async (page, search) => {
    // https://pixabay.com/api/?q=cat&page=1&key=40634472-56a7999d13afd9c7f5d079b0e&image_type=photo&orientation=horizontal&per_page=12
    const { data } = await axios.get(`https://pixabay.com/api/?q=${search}&page=${page}&key=40634472-56a7999d13afd9c7f5d079b0e&image_type=photo&orientation=horizontal&per_page=12`)
    return data;
}