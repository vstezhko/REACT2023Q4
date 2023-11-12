import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ApiService } from '../api/Api.Service';

interface Character {
  data: {
    attributes: {
      name: string;
      gender: string;
      image: string;
    };
    id: string;
  };
}

interface PeopleDetails {
  name: string;
  gender: string;
  image: string;
}

const Details = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const [detailsData, setDetailsData] = useState<PeopleDetails>();
  const [isLoading, setIsLoading] = useState(false);

  const getCharacter = useCallback(
    async (id: string) => {
      try {
        setIsLoading(true);

        const results: Character = await ApiService.getCharacter(id);

        if (results) {
          setDetailsData({
            name: results.data.attributes.name,
            gender: results.data.attributes.gender,
            image: results.data.attributes.image,
          });
        }
      } catch (error) {
        console.warn(error);
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading]
  );

  useEffect(() => {
    if (id) {
      getCharacter(id);
    }
  }, [id]);
  const handleClose = () => {
    navigate(
      `/?search=${searchParams.get('search')}&page=${searchParams.get('page')}`
    );
  };

  return (
    <div className="details border" data-testid="details">
      <button
        className="details__close"
        onClick={handleClose}
        data-testid="close"
      >
        X
      </button>

      {isLoading ? <h3>loading...</h3> : null}

      {!isLoading && detailsData?.image ? (
        <div className="details__image">
          <img src={detailsData.image} alt="character image" />
        </div>
      ) : null}

      {!isLoading && detailsData ? (
        <>
          <h4>{detailsData.name}</h4>
          <p>
            <span>gender:</span> {detailsData.gender || 'no data'}
          </p>
        </>
      ) : null}
    </div>
  );
};

export default Details;
