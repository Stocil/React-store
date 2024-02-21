import { useDispatch, useSelector } from "react-redux";
import { updateCurrentUserBasket, updateUsersBasket } from "../store/actions";
import { useLocalStorage } from "./useLocalStorage";

export function useDeleteProduct({ productId = null, selectSize = null }) {
  const dispatch = useDispatch();

  const { setStorageItem: setUsersStorage } = useLocalStorage("users");
  const { setStorageItem: setCurrentUserStorage } =
    useLocalStorage("currentUser");

  const currentUser = useSelector((state) => state.currentUser);
  const currentUserBasket = currentUser.basket;
  let users = useSelector((state) => state.users);
  users = users[0] ? users : [];

  // Add changes here in the future
  const updatedCurrentUser = currentUser;

  // Index for further changing users
  let currentUserIndex;
  const updatedUserFullDataForStorage = users.map((user, index) => {
    if (user.id === currentUser.id) {
      currentUserIndex = index;

      return user;
    }

    return user;
  });

  function handleDeleteProductFromBasket({ all = false }) {
    const updatedBasket = !all
      ? currentUserBasket.filter((basketProduct) => {
          if (
            productId === basketProduct.id &&
            selectSize === basketProduct.size
          )
            return null;

          return basketProduct;
        })
      : [];

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
  }

  return { handleDeleteProductFromBasket };
}
