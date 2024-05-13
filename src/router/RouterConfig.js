import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ABOUT, CONTACT, ROOT } from "./paths";
import HomePage from "pages/Home";
import Layout from "layouts";

/**
 * Lazy load components other than the root component
 */
const AboutPage = lazy(() => import("pages/About"));
const ContactPage = lazy(() => import("pages/Contact"));

const RouterConfig = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index path={ROOT} element={<HomePage />} />
                    <Route index path={ABOUT} element={<AboutPage />} />
                    <Route index path={CONTACT} element={<ContactPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RouterConfig;