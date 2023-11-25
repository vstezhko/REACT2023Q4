import React, { FC } from 'react';

interface DetailsParams {
  handleClose: () => void;
  detailsData: CharacterData;
}

const Details: FC<DetailsParams> = ({ detailsData, handleClose }) => {

  return (
    <div className="details border" data-testid="details">
      <button
        className="details__close"
        onClick={handleClose}
        data-testid="close"
      >
        X
      </button>

      {/*{error ? <h3>sorry, the error occurs</h3> : null}*/}

      {detailsData?.data.attributes.image ? (
        <div className="details__image">
          <img src={detailsData.data.attributes.image} alt="character image" />
        </div>
      ) : null}

      {detailsData ? (
        <>
          <h4>{detailsData.data.attributes.name}</h4>
          <p>
            <span>gender:</span>{' '}
            {detailsData.data.attributes.gender || 'no data'}
          </p>
        </>
      ) : null}
    </div>
  );
};

export default Details;
