import { useParams } from 'react-router-dom';

import { getMovieReviews } from '../../services/movies-api';
import React, { useEffect, useState } from 'react';
import s from './Reviews.module.css';
import default_photo from '../../images/default_photo.jpg';

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { movieID } = useParams();

  useEffect(() => {
    getMovieReviews(movieID)
      .then(res => {
        setLoading(false);
        res.length > 0
          ? setReviews(res)
          : setError("We don't have any review for this movie");
      })
      .catch(err => setError(err.message));
    
    return (
      setError(null)        
    )
  }, []);

  return (
    <>
      {isLoading && <h2>Loading</h2>}
      {error ? (
        <h2>{error}</h2>
      ) : (
        <ul className={s.reviewsList}>
          {reviews.map(({ author, content, id, author_details }) => {
            let authorAvatar = author_details.avatar_path
              ? //   ||
                // author_details.avatar_path.includes('/https://')
                `https://image.tmdb.org/t/p/w92${author_details.avatar_path}`
              : default_photo;
            return (
              <li key={id} className={s.reviewsItem}>
                <div className={s.authorInfo}>
                  <img
                    className={s.authorAvatar}
                    src={authorAvatar}
                    alt={author}
                  />
                  <p className={s.authorName}>{author.trim()}</p>
                </div>
                <p className={s.reviewContent}>
                  <span>"..{content}"</span>
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default Reviews;
