export const getRandomSelection = (array, count) => {
    let shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};