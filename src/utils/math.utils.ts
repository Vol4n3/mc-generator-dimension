export const generateSeed = (): number => {
  return Math.round((Math.random() - 0.5) * Math.pow(2, 64));
}