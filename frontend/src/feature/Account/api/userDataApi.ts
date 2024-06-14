// userDataApi.ts

const API_URL = "http://localhost:1337/api";

export const fetchUserDetails = async (userId: string) => {
  try {
    const response = await fetch(`${API_URL}/user-logins?filters[userId][$eq]=${userId}`);
    const result = await response.json();
    if (result.data && result.data.length > 0) {
      return result.data[0].attributes;
    } else {
      throw new Error("No user data found.");
    }
  } catch (error:any) {
    throw new Error("Error fetching user details: " + error.message);
  }
};
