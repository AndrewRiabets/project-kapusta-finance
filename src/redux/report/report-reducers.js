import { createReducer } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import * as actions from "./report-actions";

const initialState = {
  summary: [],
  categoryProfit: [],
  categoryCosts: [],
  categoryItems: [],
  date: "",
  active: null,
};

const summary = createReducer(initialState.summary, {
  [actions.summary]: (_, { payload }) => payload,
});
const categoryProfit = createReducer(initialState.categoryProfit, {
  [actions.categoryProfit]: (_, { payload }) => payload,
});
const categoryCosts = createReducer(initialState.categoryCosts, {
  [actions.categoryCosts]: (_, { payload }) => payload,
});
const categoryItems = createReducer(initialState.categoryItems, {
  [actions.categoryItems]: (_, { payload }) => payload,
});
const date = createReducer(initialState.date, {
  [actions.date]: (_, { payload }) => payload,
});
const active = createReducer(initialState.active, {
  [actions.active]: (_, { payload }) => payload,
});

export default combineReducers({
  summary,
  categoryProfit,
  categoryCosts,
  categoryItems,
  date,
  active,
});
