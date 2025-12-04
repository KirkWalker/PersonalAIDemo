export const generateFakeMessages = (start = 0, limit = 15) => {
  return Array.from({ length: limit }, (_, i) => ({
    id: start + i + 1,
    user: `User ${Math.floor(Math.random() * 10) + 1}`,
    message: `This is message ${start + i + 1}`,
  }));
};
