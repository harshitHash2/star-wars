
export const getColor = (speciesUrl) => {
  if (!speciesUrl) return 'hsl(var(--species-default))';
let arr1 = speciesUrl.trim().split('/');
console.log('Ok',arr1.at(-2))
  const speciesId = arr1.at(-2)
    // random color pick up for the tailwind
  const colorMap = {
    '1': 'hsl(200 80% 50%)',  // Blue
    '2': 'hsl(160 70% 45%)',  // Teal
    '3': 'hsl(30 60% 40%)',   // Brown
    '4': 'hsl(120 60% 45%)',  // Green
    '5': 'hsl(280 70% 55%)',  // Purple
    '6': 'hsl(40 80% 50%)',   // Gold
    '7': 'hsl(10 70% 50%)',   // Red
    '8': 'hsl(180 60% 45%)',  // Cyan
    '9': 'hsl(260 60% 50%)',  // Violet
    '10': 'hsl(340 70% 50%)', // Pink


  };

  return colorMap[speciesId] || 'hsl(var(--species-default))';
};
