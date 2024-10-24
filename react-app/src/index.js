import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import configureStore from "./store";
import { ModalProvider } from "./context/Modal";
import TagProvider from "./context/tag";

const store = configureStore();

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <ModalProvider>
//         <App />
//       </ModalProvider>
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
function Root() {
  return (
    <Provider store={store}>
      <TagProvider>
        {/* <WishlistProvider> */}
        <ModalProvider>
          <BrowserRouter>
            <App window={window} />
          </BrowserRouter>
        </ModalProvider>
        {/* </WishlistProvider> */}
      </TagProvider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root")
);
