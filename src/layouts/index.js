import { Outlet } from "react-router-dom";

import Header from "layouts/header/Header";
import { Suspense } from "react";

const Layout = () => {
    return (
        <>
            <Header />
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <Suspense fallback={<></>}>
                        <Outlet />
                    </Suspense>
                </div>
            </main>
        </>
    )
}

export default Layout;