import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { getMovieReviews } from '../../services/movies-api';
import React, { useEffect, useState } from 'react';
import s from './Reviews.module.css';
import default_photo from '../../images/default_photo.jpg';
// import PropTypes from 'prop-types';

// Reviews.propTypes = {};

function Reviews() {
  const [reviews, setReviews] = useState(null);
  const { movieID } = useParams();

  useEffect(() => {
    getMovieReviews(movieID).then(res => {
      setReviews(res);
    }); // eslint-disable-next-line
  }, []);

  return (
    <>
      {reviews && reviews.length > 0 ? (
        <ul className={s.reviewsList}>
          {reviews.map(({ author, content, id, author_details }) => {
            let authorAvatar =
              !author_details.avatar_path ||
              author_details.avatar_path.includes('/https://')
                ? `https://image.tmdb.org/t/p/w92${author_details.avatar_path}`
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
      ) : (
        <h2>So sorry:(, but we don't have any reviews for this movie</h2>
      )}
    </>
  );
}

export default Reviews;

//   {
//   "id": "58aa82f09251416f92006a3a",
//   "author": "lmao7",
//   "author_details": {
//     "name": "lmao7",
//     "username": "lmao7",
//     "avatar_path": "/ekmYOUU4tfx9zGGadjRdE7UPce.jpg",
//     "rating": 9
//   },
//   "content": "I started watching when it came out as I heard that fans of LOTR also liked this. I stopped watching after Season 1 as I was devastated lol kinda. Only 2015 I decided to continue watching and got addicted like it seemed complicated at first, too many stories and characters. I even used a guide from internet like family tree per house while watching or GOT wiki so I can have more background on the characters. For a TV series, this show can really take you to a different world and never knowing what will happen. It is very daring that any time anybody can just die (I learned not to be attached and have accepted that they will all die so I won't be devastated hehe). I have never read the books but the show is entertaining and you will really root for your faves and really hate on those you hate. \r\n\r\nFantasy, action, drama, comedy, love...and lots of surprises!",
//   "created_at": "2017-02-20T05:47:28.872Z",
//   "iso_639_1": "en",
//   "media_id": 1399,
//   "media_title": "Game of Thrones",
//   "media_type": "tv",
//   "updated_at": "2017-02-20T05:59:47.762Z",
//   "url": "https://www.themoviedb.org/review/58aa82f09251416f92006a3a"
// }

// const[authorAvatarPath, setAuthorAvatarPath] =useState(null);
// setAuthorAvatarPath(authorAvatar)

// let baseAuthorAvatarURL = `https://image.tmdb.org/t/p/w92`;
// let authorAvatar;
// if (author_details.avatar_path) {
//   let authorAvatarPath = author_details.avatar_path;

//   if (author_details.avatar_path.includes('/https://')) {
//     return authorAvatar = authorAvatarPath;
//   // authorAvatarPath = author_details.avatar_path.replace('/https://secure.gravatar.com/avatar', '');
//     // console.log(authorAvatarPath);
//   }
//   return authorAvatar =`${baseAuthorAvatarURL}${authorAvatarPath}`
// } else {authorAvatar = default_photo }
// // /https://secure.gravatar.com/avatar
