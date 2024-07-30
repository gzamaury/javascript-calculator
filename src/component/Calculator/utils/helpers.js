function concatCharToLastElem(inputArray, char) {
  const lastElem = inputArray[inputArray.length - 1];
  let newElement = removeLeadingZeros(lastElem + char);

  newElement = removeTrailingPoints(newElement);

  return [...inputArray.slice(0, -1), newElement];
}

function removeLeadingZeros(str) {
  return str
    .replace(/^(-?)0+(?=\d)/, "$1") // remove leading zeros from positive or negative numbers
    .replace(/^(-?)0*\./, "$1."); // remove leading zero before a decimal point
  // Remove Leading Zeros for Numbers:
  //  - /^(-?)0+(?=\d)/: This regex matches zero or one - sign and captures it in a group(-?),
  //    followed by one or more zeros(0+) at the start of the string(^), but only if they are
  //    followed by a digit((?=\d)).
  //  - The replace function replaces the leading zeros with an empty string, but will keep the
  //    - if it exists.
  // Remove Leading Zeros Before a Decimal Point:
  // -  /^(-?)0*\./: This regex matches an optional negative sign(-?), followed by zero
  //    or more zeros(0*), and then a decimal point(\.) at the start of the string(^).
  // -  The replace function removes the leading zeros and keeps the negative sign and the
  //    decimal point($1.).
}

function removeTrailingPoints(str) {
  return str.replace(/(\.\d*)(\.)/, "$1");
  // - (\.\d*): This is the first capturing group.
  //    - \.: Matches a literal decimal point.
  //    - \d*: Matches zero or more digits.
  // - (\.): This is the second capturing group.
  //    - \.: Matches another literal decimal point.
  // - "$1": The entire match will be replaced by the contents of the first capturing group.
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
  const result = eval(expression);

  if (typeof result === "number") {
    // Round to 4 decimal places if the result is a number
    return Number(result.toFixed(4));
  }
  // Return the original result if it's not a number
  return result;
}

function triggerVibration() {
  if (navigator.vibrate) {
    navigator.vibrate(100);
  } else {
    // eslint-disable-next-line no-console
    console.log("Vibration API not supported on this device.");
  }
}

export {
  removeLeadingZeros,
  removeTrailingZeros,
  concatCharToLastElem,
  removeTrailingZerosFromLastElem,
  calculateOperation,
  triggerVibration,
};
