
const API_URL = "http://localhost:1337/api";

export const checkUserExists = async (email: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/user-logins?filters[email][$eq]=${encodeURIComponent(email)}`);
      const data = await response.json();
      return data.data.length > 0;
    } catch (error:any) {
      console.error("Error checking user existence:", error.message);
      return false;
    }
  };

  export const sendUserDetailsToBackend = async (email: string, uid: string) => {
    try {
      const userExists = await checkUserExists(email);
      if (!userExists) {
        const loginData = { email, userId: uid };
        const response = await fetch(`${API_URL}/user-logins`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: loginData }),
        });
        if (!response.ok) {
          throw new Error("Failed to store user details in backend.");
        }
      }
    } catch (error:any) {
      console.error("Error storing user details in backend:", error.message);
    }
  };