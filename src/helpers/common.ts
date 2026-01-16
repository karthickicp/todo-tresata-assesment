export const generateUniqueId = () => {
  return (
    crypto.randomUUID() ||
    `${Date.now()}-${Math.random().toString(16).slice(2)}`
  );
};
