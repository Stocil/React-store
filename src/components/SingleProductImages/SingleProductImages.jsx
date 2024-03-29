import {
  ImagesInner,
  LoadingMainImage,
  SideImagesInner,
} from "./SingleProductImages.styles";

export function SingleProductImages({
  product,
  mainImage,
  handleMainImage,
  isLoading,
}) {
  if (isLoading) {
    return <LoadingMainImage variant="rounded" />;
  }

  if (!product.images) return;

  const images = product.images.map((imageUrl, index) => {
    if (!imageUrl.startsWith("https")) return null;

    return (
      <img
        key={imageUrl}
        onClick={() => handleMainImage(index)}
        src={imageUrl}
        className="product__side-image"
      />
    );
  });

  return (
    <ImagesInner>
      <img
        src={
          product.images[mainImage].startsWith("https")
            ? product.images[mainImage]
            : "https://uhdpapers.com/wp-content/uploads/2018/01/blur1-1024x576.png"
        }
        className="product__main-image"
      />

      <SideImagesInner>{images}</SideImagesInner>
    </ImagesInner>
  );
}
