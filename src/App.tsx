import { createBrowserRouter, redirect, RouteObject, RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { onAuthStateChanged } from "firebase/auth";

import ModalView from "./components/search/modalView";
import { auth } from "./firebaseConfig";
import AuthPresenter from "./pages/Auth/authPresenter";
import DashboardPresenter from "./pages/Dashboard/dashboardPresenter";
import LoginPresenter from "./pages/Login/loginPresenter";
import NotFoundPresenter from "./pages/NotFound/notFoundPresenter";
import RegisterPresenter from "./pages/Register/registerPresenter";
import RequestResetPasswordPresenter from "./pages/RequestResetPassword/requestResetPasswordPresenter";
import VerificationPresenter from "./pages/Verification/verificationPresenter";

const queryClient = new QueryClient();

// Handles redirect based on auth state
async function authLoader(on: "authed" | "unauthed" = "authed", to: string) {
  const authPromise = new Promise<string | null>(resolve => {
    onAuthStateChanged(auth, user => {
      if (on === "authed" && user) {
        if (!user.emailVerified) {
          resolve("/verification");
        }
        resolve(to);
      } else if (on === "unauthed" && !user) {
        resolve(to);
      } else {
        resolve(null);
      }
    });
  });
  const redirectTo = await authPromise;
  if (redirectTo) {
    return redirect(redirectTo);
  }
  return null;
}

export const dashboardRoute: RouteObject = {
  path: "/dashboard",
  loader: async () => authLoader("unauthed", "/login"),
  element: <DashboardPresenter />,
};

export const notFoundRoute: RouteObject = {
  path: "*",
  element: <NotFoundPresenter />,
};

export const loginRoute: RouteObject = {
  path: "/login",
  loader: async () => authLoader("authed", "/dashboard"),
  element: <LoginPresenter />,
};

export const requestResetRoute: RouteObject = {
  path: "/request-reset",
  element: <RequestResetPasswordPresenter />,
};

export const registerRoute: RouteObject = {
  path: "/register",
  element: <RegisterPresenter />,
};

export const searchRoute: RouteObject = {
  path: "/search",
  element: <ModalView />,
};

export const verificationRoute: RouteObject = {
  path: "/verification",
  element: <VerificationPresenter />,
};

export const authRoute: RouteObject = {
  path: "/_/auth/action",
  element: <AuthPresenter />,
};

const router = createBrowserRouter([
  dashboardRoute,
  loginRoute,
  registerRoute,
  authRoute,
  verificationRoute,
  searchRoute,
  notFoundRoute,
  requestResetRoute,
]);

function App() {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
        globalStyles: () => ({
          body: {
            overflowX: "hidden",
          },
        }),
        primaryColor: "red",
        defaultRadius: "xs",
        cursorType: "pointer",
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </MantineProvider>
  );
}

export default App;
