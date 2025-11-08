import type { RouteObject } from "react-router-dom";
import Categories from "./pages/categories/Categories";
import CategoryDetail from "./pages/categories/CategoryDetail";
import CreateCategory from "./pages/categories/CreateCategory"; 
import EditCategory from "./pages/categories/EditCategory"

export const routes: RouteObject[] = [
  {
    path: "/category",
    element: <Categories />,
  },
  {
    path: "/category/:categoryId",
    element: <CategoryDetail />
  },
  {
    path: "/category/create",
    element: <CreateCategory />
  },
  {
    path: "/category/edit/:categoryId",
    element: <EditCategory />
  }
]