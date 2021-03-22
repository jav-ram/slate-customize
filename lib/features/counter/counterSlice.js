"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.selectCount = exports.incrementAsync = exports.incrementByAmount = exports.decrement = exports.increment = exports.counterSlice = void 0;var _toolkit = require("@reduxjs/toolkit");

var counterSlice = (0, _toolkit.createSlice)({
  name: 'counter',
  initialState: {
    value: 0 },

  reducers: {
    increment: function increment(state) {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: function decrement(state) {
      state.value -= 1;
    },
    incrementByAmount: function incrementByAmount(state, action) {
      state.value += action.payload;
    } } });exports.counterSlice = counterSlice;var _counterSlice$actions =



counterSlice.actions,increment = _counterSlice$actions.increment,decrement = _counterSlice$actions.decrement,incrementByAmount = _counterSlice$actions.incrementByAmount;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
exports.incrementByAmount = incrementByAmount;exports.decrement = decrement;exports.increment = increment;var incrementAsync = function incrementAsync(amount) {return function (dispatch) {
    setTimeout(function () {
      dispatch(incrementByAmount(amount));
    }, 1000);
  };};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
exports.incrementAsync = incrementAsync;var selectCount = function selectCount(state) {return state.counter.value;};exports.selectCount = selectCount;var _default =

counterSlice.reducer;exports.default = _default;