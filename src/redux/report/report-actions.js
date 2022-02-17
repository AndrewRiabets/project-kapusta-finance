import { createAction } from "@reduxjs/toolkit";
export const summary = createAction("report/summary");
export const categoryProfit = createAction("report/categoryProfit");
export const categoryCosts = createAction("report/categoryCosts");
export const categoryItems = createAction("report/categoryItems");
export const date = createAction("report/date");
export const active = createAction("report/active");
