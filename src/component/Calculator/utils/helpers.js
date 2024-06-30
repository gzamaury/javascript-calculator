function concatCharToLastElem(inputArray, char) {
  const lastElem = inputArray[inputArray.length - 1];
  let newElement = removeLeadingZeros(lastElem + char);

  newElement = removeTrailingPoints(newElement);

  return [...inputArray.slice(0, -1), newElement];
}

function removeLeadingZeros(str) {
  const oneZeroStr = str.replace(/^0+/, "0");

  if (oneZeroStr.length <= 1) {
    return oneZeroStr;
  }

  return oneZeroStr.replace(/^0+/, "");
}

function removeTrailingPoints(str) {
  return str.replace(/(\.\d*?)(\.)/, "$1");
}

function removeTrailingZerosFromLastElem(inputArray) {
  const lastElem = inputArray[inputArray.length - 1];
  if (removeTrailingZeros(lastElem) === "") {
    return [...inputArray.slice(0, -1)];
  }

  return [...inputArray.slice(0, -1), removeTrailingZeros(lastElem)];
}

function removeTrailingZeros(str) {
  return str.replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "");
}

function calculateOperation(expression) {
  // eslint-disable-next-line no-eval
  return eval(expression);
}

export {
  concatCharToLastElem,
  removeTrailingZerosFromLastElem,
  calculateOperation,
};
