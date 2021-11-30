import { useParams } from 'react-router-dom';
import { getMovieCast } from '../../services/movies-api';
import { useEffect, useState } from 'react';
import s from './Cast.module.css';
import default_photo from '../../images/default_photo.jpg';

function Cast() {
  const [cast, setCast] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { movieID } = useParams();
  useEffect(() => {
    getMovieCast(movieID)
      .then(result => {
        setLoading(false);
        result.length > 0
          ? setCast(result)
          : setError("We don't have cast for this movie");
      })
      .catch(err => setError(err.message));
  }, []);
  return (
  <>
  {isLoading && <p>Loading</p>}
  {error ? (
    <p>{error}</p>
  ) : (
    <ul className={s.castList}>
      {cast.map(({ cast_id, profile_path, original_name, character, name }) => {
        let actorPhoto = profile_path
          ? `https://image.tmdb.org/t/p/w185/${profile_path}`
          : default_photo;
        return (
          <li key={cast_id} className={s.castItem}>
            <img className={s.actorPhoto} src={actorPhoto} alt={name} />
            <h4 className={s.castName}>{original_name}</h4>
            <p>
              <span className={s.castCharacter}>Character:</span> {character}
            </p>
          </li>
        );
      })}
    </ul>
)
      }
      </>
)
}

export default Cast;
