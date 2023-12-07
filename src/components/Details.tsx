import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ApiService } from '../api/Api.Service';

interface PeopleDetails {
  name: string | null;
  gender: string | null;
  birth_year: string | null;
  skin_color: string | null;
  eye_color: string | null;
  height: string | null;
}

const Details = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const [detailsData, setDetailsData] = useState<PeopleDetails>({
    name: null,
    gender: null,
    birth_year: null,
    skin_color: null,
    eye_color: null,
    height: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const getPerson = useCallback(
    async (id: number) => {
      try {
        setIsLoading(true);

        const results: PeopleDetails = await ApiService.getPerson(id);

        if (results) {
          setDetailsData(results);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading]
  );

  useEffect(() => {
    if (id) {
      getPerson(+id);
    }
  }, [id]);

  const handleClose = () => {
    navigate(
      `/?search=${searchParams.get('search')}&page=${searchParams.get('page')}`
    );
  };

  return (
    <div className="details">
      <div className="details__close" onClick={handleClose}>
        X
      </div>
      {isLoading ? (
        <h3>loading...</h3>
      ) : (
        <>
          <h4>
            <span>name:</span> {detailsData.name}
          </h4>
          <p>
            <span>gender:</span> {detailsData.gender}
          </p>
          <p>
            <span>height:</span> {detailsData.height}
          </p>
          <p>
            <span>birth year:</span> {detailsData.birth_year}
          </p>
          <p>
            <span>skin color:</span> {detailsData.skin_color}
          </p>
          <p>
            <span>eye color:</span> {detailsData.eye_color}
          </p>
        </>
      )}
    </div>
  );
};

export default Details;
