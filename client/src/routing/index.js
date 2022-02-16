import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Loading } from "components";

const Signin = lazy(() => import("pages/signin"));
const HomeLayout = lazy(() => import("pages/home/homeLayout"));
const Dashboard = lazy(() => import("containers/dashboard"));
const Services = lazy(() => import("containers/services"));
const Categories = lazy(() => import("containers/categories"));
const Coupons = lazy(() => import("containers/coupons"));
const Staffs = lazy(() => import("containers/staffs"));
const Profile = lazy(() => import("containers/profile"));

function Routing({auth}) {

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="services" element={<Services />}>
            <Route path=":serviceId" element={<h1>Info service</h1>} />
          </Route>
          <Route path="categories" element={<Categories />}>
            <Route path=":categoryId" element={<h1>Info Category</h1>} />
          </Route>
          <Route path="coupons" element={<Coupons />} />
          <Route path="staffs" element={<Staffs />}>
            <Route path=":staffId" element={<h1>Info Staff</h1>} />
          </Route>
          <Route path="profile" element={<Profile  auth={auth}/>} />
          <Route path="*" element={<h1>There is nothing here</h1>} />
        </Route>
        <Route path="/signin" element={<Signin />}></Route>
      </Routes>
    </Suspense>
  );
}

export default Routing;
