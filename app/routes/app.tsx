import type { HeadersFunction, LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { NavMenu } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux';
import { useEffect } from 'react';
import { setShop } from '../redux/reducers/shop.reducer';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const auth = await authenticate.admin(request);
  const response = await auth.admin.graphql(
    `#graphql
    query getShop{
      shop {
        name
      }
    }
    `
  )
  const resJson = await response.json();
  const shop = resJson.data?.shop
  return { apiKey: process.env.SHOPIFY_API_KEY || "", shop: shop, ...auth };
};

export default function App() {
  const auth = useLoaderData<typeof loader>();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setShop(auth.shop));
  }, [auth])

  return (
    <AppProvider isEmbeddedApp apiKey={auth.apiKey} >
      <NavMenu>
        <Link to="/app" rel="home">Home</Link>
        <Link to="/app/block-ip">Block IP Rules</Link>
      </NavMenu>
      <Outlet />
    </AppProvider>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers: HeadersFunction = (headersArgs) => {
  return boundary.headers(headersArgs);
};
