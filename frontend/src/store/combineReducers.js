import { combineReducers } from "redux";
import billSlice from "./Bill/Bill.reducer";
import homeSlice from "./Home/Home.reducer";
import loginSlice from "./Login/Login.reducer";
import ruleSlice from "./Rules/Rules.reducer";
import shoppingSlice from "./Shopping/Shopping.reducer";
import todoSlice from "./ToDo/ToDo.reducer";
import userSlice from "./User/User.reducer";

export default combineReducers({
    login: loginSlice,
    rule: ruleSlice,
    user: userSlice,
    todo: todoSlice,
    shopping: shoppingSlice,
    bill: billSlice,
    home: homeSlice,
})