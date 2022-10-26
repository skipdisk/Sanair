const firstLetter = (word) => {
  return word[0];
};

export const getAcronym = (str) => {
  var words = str.split(" "); // ["for","your","information"]
  var acr = words.map(firstLetter); // ["f","y","i"]
  return acr.join("").toUpperCase();
};
