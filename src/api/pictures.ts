export interface PictureProps {
  id: string;
  alt_description: string;
  urls: object;
  likes: number;
}

export async function getPictures(page: number): Promise<PictureProps[]> {
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/?order_by=popular&page=${page}&per_page=20&client_id=M_QX4mwWnOnICoQIMFKYNiOrbOWjEAQAdHF6-8b-U9Q`
      // credentials should be in .env file, but i did not used it because it is test project only.
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error: err");
    throw err;
  }
}

export async function getPicturesBySearch(page: number, inputValue: string): Promise<PictureProps[]> {
  try {
    if (inputValue !== "") {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${inputValue}&order_by=popular&page=${page}&per_page=20&client_id=M_QX4mwWnOnICoQIMFKYNiOrbOWjEAQAdHF6-8b-U9Q`
        // credentials should be in .env file, but i did not used it because it is test project only.
      );
      const data = await response.json();
      return data.results;
    } else {
      return [];
    }
  } catch (err) {
    console.log("Error: err");
    throw err;
  }
}
