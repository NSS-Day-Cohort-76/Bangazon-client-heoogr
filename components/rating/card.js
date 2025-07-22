import { Rating } from 'react-simple-star-rating'

export function RatingCard({ rating }) {
  if (!rating) return null; // or return some fallback UI

  return (
    <div className="tile is-child">
      <article className="media box is-align-items-center">
        <figure className="media-left">
          <Rating initialValue={rating.rating} readonly={true} />
        </figure>
        <div className="media-content">
          <div className="content">
            <p>{rating.review || "No review provided."}</p>
          </div>
        </div>
      </article>
    </div>
  )
}
