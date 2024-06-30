function isSubtractOperator(e) {
  return /^[-]$/.test(e);
}
function isAddOperator(e) {
  return /^[+]$/.test(e);
}
function isMultiOrDivOperator(e) {
  return /^[*/]$/.test(e);
}
function isANumberOrPoint(e) {
  return /^[\d.]$/.test(e);
}
function isAnOperator(element) {
  return /^[+\-*//]$/.test(element);
}
function isEqOperator(element) {
  return /=/.test(element);
}

export {
  isEqOperator,
  isAnOperator,
  isANumberOrPoint,
  isMultiOrDivOperator,
  isAddOperator,
  isSubtractOperator,
};
