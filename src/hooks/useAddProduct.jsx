import { useDispatch, useSelector } from "react-redux";
import {
  updateCurrentUserBasket,
  updateCurrentUserFavourite,
  updateUsersBasket,
  updateUsersFavourite,
} from "../store/actions";
import { useLocalStorage } from "./useLocalStorage";
import { useState } from "react";

export function useAddProduct({ product, newPrice = null, selectSize = null }) {
  const dispatch = useDispatch();

  const [snackOpen, setSnackOpen] = useState(false);
  const finalPrice = newPrice ? +newPrice.substr(0, newPrice.length - 1) : null;

  const { setStorageItem: setUsersStorage } = useLocalStorage("users");
  const { setStorageItem: setCurrentUserStorage } =
    useLocalStorage("currentUser");

  const currentUser = useSelector((state) => state.currentUser);
  const currentUserBasket = currentUser.basket;
  const currentUserFavourite = currentUser.favourite;
  let users = useSelector((state) => state.users);
  users = users[0] ? users : [];

  const updatedCurrentUser = currentUser;

  let currentUserIndex;
  const updatedUserFullDataForStorage = users.map((user, index) => {
    if (user.id === currentUser.id) {
      currentUserIndex = index;

      return user;
    }

    return user;
  });

  const isProductInFavourite =
    currentUserFavourite.filter((favouriteProduct) => {
      if (
        product.id === favouriteProduct.id &&
        selectSize === favouriteProduct.size
      ) {
        return favouriteProduct;
      }
    })[0] || false;

  function handleAddToBasket({ amount = null }) {
    if (!currentUser.id) return;

    const isProductInBasket =
      currentUserBasket.filter((basketProduct) => {
        if (
          product.id === basketProduct.id &&
          basketProduct.size === selectSize
        ) {
          return basketProduct;
        }
      })[0] || false;

    let updatedBasket = currentUserBasket;

    if (isProductInBasket) {
      updatedBasket = updatedBasket.map((basketProduct) => {
        if (
          product.id === basketProduct.id &&
          basketProduct.size === selectSize
        ) {
          return {
            ...basketProduct,
            count:
              amount || amount === 0 ? amount || 1 : basketProduct.count + 1,
          };
        }

        return basketProduct;
      });
    } else {
      const fullProductData = {
        ...product,
        size: selectSize ? selectSize : null,
        finalPrice: finalPrice ? finalPrice : product.price,
        count: 1,
      };

      updatedBasket.unshift(fullProductData);
    }

    // Update data for storage
    updatedCurrentUser.basket = updatedBasket;
    updatedUserFullDataForStorage[currentUserIndex].basket = updatedBasket;

    setCurrentUserStorage(updatedCurrentUser);
    setUsersStorage(updatedUserFullDataForStorage);

    dispatch(updateCurrentUserBasket(updatedBasket));
    dispatch(
      updateUsersBasket({
        products: updatedBasket,
        id: currentUser.id,
      })
    );

    handleToggleSnack();
  }

  function handleAddToFavourite() {
    if (!currentUser.id) return;

    let updatedFavourite = currentUserFavourite;

    const fullProductData = {
      ...product,
      size: selectSize ? selectSize : null,
      finalPrice: finalPrice ? finalPrice : product.price,
    };

    updatedFavourite.unshift(fullProductData);

    // Update data for storage
    updatedCurrentUser.favourite = updatedFavourite;
    updatedUserFullDataForStorage[currentUserIndex].favourite =
      updatedFavourite;

    // setCurrentUserStorage(updatedCurrentUser);
    // setUsersStorage(updatedUserFullDataForStorage);

    dispatch(updateCurrentUserFavourite(updatedFavourite));
    dispatch(
      updateUsersFavourite({
        products: updatedFavourite,
        id: currentUser.id,
      })
    );

    handleToggleSnack();
  }

  function handleToggleSnack() {
    setSnackOpen((current) => !current);
  }

  return {
    handleAddToBasket,
    handleAddToFavourite,
    isProductInFavourite,
    handleToggleSnack,
    snackOpen,
  };
}
