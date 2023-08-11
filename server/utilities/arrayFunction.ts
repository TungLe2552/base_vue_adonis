export function shuffleArray(array: Array<any>): Array<any> {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function splitString(input: string): Array<string> {
  var numbers = input.match(/\d+/g);
  return numbers || []
}