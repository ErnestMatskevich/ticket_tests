import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";

// import { Sidebar } from "layout/Sidebar/Sidebar";

import { useNavigate } from "react-router-dom";
import styles from "./AuthLayout.module.scss";
import { Header } from "../Header/Header";
import { RootState } from "../../../store/store";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { isTokenExpired } from "../../lib/functions";

export function AuthLayout() {
  const navigate = useNavigate();
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

  const { token } = useAppSelector((state) => state.persistedReducer.authSlice);

  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      navigate("/tickettrack/login");
      return;
    }
  }, []);
  return (
    <div className={styles.layout}>
      {/* <Sidebar /> */}
      <section className={styles.content_wrapper}>
        {token && <Header />}
        <main className={styles.main_content}>
          <Outlet />
        </main>
      </section>
    </div>
  );
}
