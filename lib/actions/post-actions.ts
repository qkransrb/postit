export const fetchPosts = async () => {
  try {
    const response = await fetch(`${process.env.API_URL}/api/posts`, {
      method: "GET",
      cache: "no-cache",
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      console.log(data.message);
    }
  } catch (error) {
    throw error;
  }
};
