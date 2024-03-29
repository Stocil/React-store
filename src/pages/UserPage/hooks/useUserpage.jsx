import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../store/actions";

import { getProducts } from "../../../store/asyncActions/products";
import { getProductsByIds } from "../../../utils/getProductsByIds";
import { useSearchParams } from "react-router-dom";

export function useUserpage(setModalOpen) {
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const recentProductsPage = searchParams.get("recentProductsPage") || 1;

  const user = useSelector((state) => state.currentUser);
  const userAvatar = user.avatarUrl
    ? user.avatarUrl
    : "/React-store/assets/defAvatar.svg";

  const products = useSelector((state) => state.products.products);
  const productsData = {
    isError: useSelector((state) => state.products.error),
    isLoading: useSelector((state) => state.products.loading),
  };
  const recentProductsList = useSelector(
    (state) => state.currentUser.recentProducts
  );

  productsData.products = useMemo(() => {
    return getProductsByIds(products, recentProductsList);
  }, [products, recentProductsList]);
  const recentProductsMaxPage = Math.ceil(productsData.products.length / 3);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  function handleLogOut() {
    localStorage.removeItem("currentUser");
    dispatch(logoutUser());
  }

  function handleToggleModal() {
    setModalOpen((t) => !t);
  }

  function handleChangeRecentProductsPage() {
    searchParams.set("recentProductsPage", +recentProductsPage + 1);
    setSearchParams(searchParams, { replace: true });
  }

  return {
    user,
    userAvatar,
    handleLogOut,
    handleToggleModal,
    productsData,
    recentProductsPage,
    recentProductsMaxPage,
    handleChangeRecentProductsPage,
  };
}
