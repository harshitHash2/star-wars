export const getRandomImage = (seed) => {
  const arr1 = seed.split("");
  const id = Math.abs(
    arr1.reduce((acc, char) => acc + char.charCodeAt(0), 0) % 1000
  );
// console.log(id)
  return `https://picsum.photos/seed/${id}/400/500`;
  
};