const add = (a, b) => {
  return a + b;
};

// push onto window so it can be seen by any jsx component
// reason "use strict" https://stackoverflow.com/a/33109866/3547108
window.app.mathUtils = { add };

// exportable by any js module, not jsx component
export { add };
