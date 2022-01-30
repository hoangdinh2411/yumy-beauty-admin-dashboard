import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Loading } from "components";

const Signin = lazy(() => import("pages/signin"));
const HomeLayout = lazy(() => import("pages/home/homeLayout"));
const Dashboard = lazy(() => import("containers/dashboard"));
const Services = lazy(() => import("containers/services"));

function Routing() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Services />} />
          {/* <Route index element={<Dashboard />} /> */}
          <Route path="services" element={<Services />} />
          <Route path="*" element={<h1>There is nothing here</h1>} />
        </Route>
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Suspense>
  );
}

export default Routing;
