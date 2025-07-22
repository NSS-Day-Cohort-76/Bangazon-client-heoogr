// import { Rating } from 'react-simple-star-rating'
import dynamic from 'next/dynamic'
import { useState } from 'react'

export default function RatingForm({ saveRating, productId }) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  
  const submitRating = () => {
  const outOf5 = rating
  console.log("Submitting rating:", outOf5, comment);
  saveRating({
    rating: outOf5,
    review: comment
  })
}

  const Rating = dynamic(() => import('react-simple-star-rating').then(mod => mod.Rating), {
    ssr: false,
  })


  return (
    <div className="tile is-child ">
      <article className="media box">
        <figure className="media-left">
          <Rating onClick={setRating} ratingValue={rating} />
        </figure>
        <div className="media-content">
          <div className="field">
            <p className="control">
              <textarea className="textarea" placeholder="Add your review" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button className="button" onClick={submitRating}>Post Rating</button>
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}
