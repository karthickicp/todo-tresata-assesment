import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router";

import { AddOrUpdateTodo } from "./views/subPages/AddOrUpdateTodo";
import { store } from "./store/store";
import { Todo } from "./views/todo";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const persistorStore = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<div className="loading" />}
        persistor={persistorStore}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Todo />} />
            <Route path="/todo" element={<AddOrUpdateTodo />} />
            <Route path="/todo/:id" element={<AddOrUpdateTodo />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
