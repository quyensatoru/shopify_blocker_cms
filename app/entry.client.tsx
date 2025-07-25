import { RemixBrowser } from "@remix-run/react";
import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import "@shopify/polaris/build/esm/styles.css";
import "./assets/css/override_polaris.css";
import { Provider } from "react-redux";
import store from "./redux";

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <Provider store={store}>
        <RemixBrowser />
      </Provider>
    </StrictMode>
  );
});
