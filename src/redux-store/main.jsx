import React from "react";
import { default as store } from "./app/store";
import { Provider } from "react-redux";
import App from "./app";

export default function Main() {
  // console.log(store.getState());
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}
