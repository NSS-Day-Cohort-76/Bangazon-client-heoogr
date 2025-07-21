import { useEffect } from "react";
import CardLayout from "../components/card-layout";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import { ProductCard } from "../components/product/card";
import { StoreCard } from "../components/store/card";
import { useAppContext } from "../context/state";
import { getUserProfile } from "../data/auth";

export default function Profile() {
  const { profile, setProfile } = useAppContext();

  useEffect(() => {
    getUserProfile().then((profileData) => {
      if (profileData) {
        setProfile(profileData);
      }
    });
  }, []);

  return (
    <>
      <CardLayout title="Favorite Stores" width="is-full">
        <div className="columns is-multiline">
          {profile.favorites?.length > 0 ? (
            profile.favorites.map((favorite) => (
              <StoreCard
                key={favorite.id}
                store={favorite}
                width="is-one-third"
              />
            ))
          ) : (
            <p className="has-text-grey is-italic px-4 py-2">
              You haven’t added any favorite stores yet.
            </p>
          )}
        </div>
      </CardLayout>

      <CardLayout title="Products you've recommended" width="is-full">
        <div className="columns is-multiline">
          {profile.recommends?.length > 0 ? (
            profile.recommends.map((recommendation) => (
              <ProductCard
                key={recommendation.product.id}
                product={recommendation.product}
                width="is-one-third"
              />
            ))
          ) : (
            <p className="has-text-grey is-italic px-4 py-2">
              You haven’t recommended any products yet.
            </p>
          )}
        </div>
      </CardLayout>

      <CardLayout title="Products recommended to you" width="is-full">
        <div className="columns is-multiline">
          {profile.recommended_to_me?.length > 0 ? (
            profile.recommended_to_me.map((recommendation) => (
              <ProductCard
                key={recommendation.product.id}
                product={recommendation.product}
                width="is-one-third"
              />
            ))
          ) : (
            <p className="has-text-grey is-italic px-4 py-2">
              No products have been recommended to you yet.
            </p>
          )}
        </div>
      </CardLayout>

      <CardLayout title="Products you've liked" width="is-full">
        <div className="columns is-multiline">
          {profile.liked_products?.length > 0 ? (
            profile.liked_products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                width="is-one-third"
              />
            ))
          ) : (
            <p className="has-text-grey is-italic px-4 py-2">
              You haven’t liked any products yet.
            </p>
          )}
        </div>
      </CardLayout>
    </>
  );
}

Profile.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Navbar />
      <section className="container">{page}</section>
    </Layout>
  );
};
