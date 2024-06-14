export const populateMuniDict = (arr) =>
  arr.reduce((ac, a) => ({ ...ac, [a]: { start: null, end: null } }), {});

export const populateStationDict = (arr) =>
  arr.reduce((ac, a) => ({ ...ac, [a]: { start: null, end: null } }), {});

export const formatTotal = (n) => new Intl.NumberFormat("en-US", {}).format(n);
