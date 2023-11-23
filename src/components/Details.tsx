import React, { useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useGetCharacterQuery } from '../../redux/hpApi';
import { loadingSlice } from '../../redux/slices/loadingSlice';
import { useDispatch } from '../../redux/store';

const Details = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { id = '' } = useParams();
  const dispatch = useDispatch();

  const { data, error, isFetching } = useGetCharacterQuery(id);

  useEffect(() => {
    dispatch(loadingSlice.actions.setCharacterLoading(isFetching));
  }, [isFetching]);
  const handleClose = () => {
    navigate(
      `/?search=${searchParams.get('search')}&page=${searchParams.get('page')}`
    );
  };

  if (error) {
    console.warn(error);
  }

  return (
    <div className="details border" data-testid="details">
      <button
        className="details__close"
        onClick={handleClose}
        data-testid="close"
      >
        X
      </button>

      {error ? <h3>sorry, the error occurs</h3> : null}

      {isFetching ? <h3>loading...</h3> : null}

      {!isFetching && data?.data.attributes.image ? (
        <div className="details__image">
          <img src={data.data.attributes.image} alt="character image" />
        </div>
      ) : null}

      {!isFetching && data ? (
        <>
          <h4>{data.data.attributes.name}</h4>
          <p>
            <span>gender:</span> {data.data.attributes.gender || 'no data'}
          </p>
        </>
      ) : null}
    </div>
  );
};

export default Details;
