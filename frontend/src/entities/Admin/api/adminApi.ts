// src/api/adminAuth.ts
export const loginAdminApi = async (email: string, password: string) => {
    const response = await fetch('http://localhost:1337/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    if (!response.ok) {
      throw new Error('Invalid credentials');
    }
  
    const data = await response.json();
    localStorage.setItem('adminToken', data.jwt);
    return data.jwt;
  };
  