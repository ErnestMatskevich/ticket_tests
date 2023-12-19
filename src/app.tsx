import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import { MainPage, PersonalPage } from "./pages";
import { LoginPage } from "./pages/LoginPage";
import { Provider } from "react-redux";
import { AuthLayout } from "./components/layout/AuthLayout/AuthLayout";
import { store } from "./store/store";
import { ErrorBoundary } from "react-error-boundary";

const App = () => {
  return (
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <BrowserRouter>
          <Suspense fallback={<div>Загрузка...</div>}>
            <ErrorBoundary fallback={<div>Error...</div>}>
              <Routes>
                <Route path="/" element={<AuthLayout />}>
                  <Route path="/tickettrack" element={<MainPage />} />
                  <Route path="/tickettrack/login" element={<LoginPage />} />
                  <Route
                    path="/tickettrack/personal"
                    element={<PersonalPage />}
                  />
                </Route>
              </Routes>
            </ErrorBoundary>
          </Suspense>
        </BrowserRouter>
      </StyledEngineProvider>
    </Provider>
  );
};

export default App;
