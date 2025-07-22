import { useState, useEffect } from "react";
import { rateProduct } from "../../data/products";
import { RatingsContainer } from "./container";
import { Header } from "./header";

export function Ratings({
  productId,
  average_rating,
  refresh,
  ratings = [],
  number_purchased,
  likes = [],
}) {
console.log("Ratings component productId:", productId);

  const saveRating = (newRating) => {
    if (!productId || productId === 0) {
      console.error("Invalid productId, cannot rate");
      console.log("Calling rateProduct with:", ratingObj);

      return;
    }
    rateProduct(productId, newRating).then(refresh);
  };

  return (
    <div className="tile is-ancestor is-flex-wrap-wrap">
      <Header
        averageRating={average_rating}
        ratingsLen={ratings.length}
        numberPurchased={number_purchased}
        likesLength={likes.length}
      />
      <RatingsContainer ratings={ratings} saveRating={saveRating} productId={productId}/>
    </div>
  );
}
