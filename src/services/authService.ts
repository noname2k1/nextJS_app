import * as withAuthInstance from '@/config/withAuthInstance';
const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const res = await withAuthInstance.post('/api/v1/auth/login', {
      username,
      password,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const refreshToken = async () => {
  try {
    const res = await withAuthInstance.get('/api/v1/auth/refresh', {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export { login, refreshToken };
