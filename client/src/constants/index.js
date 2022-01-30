import { FaEyeSlash, FaEye } from "react-icons/fa";

export const menuItems = [
  {
    id: 1,
    path: "/",
    title: "dashboard",
  },
  {
    id: 2,
    path: "/services",
    title: "services",
  },
  {
    id: 3,
    path: "/category",
    title: "category",
  },
  {
    id: 4,
    path: "/customers",
    title: "customers",
  },
  {
    id: 5,
    path: "/orders",
    title: "orders",
  },
  {
    id: 6,
    path: "/coupons",
    title: "coupons",
  },
  {
    id: 7,
    path: "/staff",
    title: "staff",
  },
  {
    id: 8,
    path: "/setting",
    title: "setting",
  },
];

export const formFields = {
  signInForm: [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
    },
    {
      id: 2,
      name: "password",
      type: {
        hide: "password",
        show: "text",
      },
      placeholder: "Password ",
      icon: {
        hide: <FaEyeSlash />,
        show: <FaEye />,
      },
    },
  ],
  signUpForm: [
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeholder: "Full name",
    },
    {
      id: 2,
      name: "username",
      type: "text",
      placeholder: "Username",
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email",
    },
    {
      id: 4,
      name: "password",
      type: {
        hide: "password",
        show: "text",
      },
      placeholder: "Password ",
      icon: {
        hide: <FaEyeSlash />,
        show: <FaEye />,
      },
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm password ",
    },
  ],
};

export const selectByCategories = {
  name: "services",
  title: "Services",
  options: [
    {
      id: 1,
      value: "Pedicure",
    },
    {
      id: 2,
      value: "Manicure",
    },
    {
      id: 3,
      value: "Lash and Lift",
    },
  ],
};
export const selectByPrices = {
  name: "price",
  title: "Price",
  options: [
    {
      id: 1,
      value: "Hight to Low",
    },
    {
      id: 2,
      value: "Low to High",
    },
  ],
};
