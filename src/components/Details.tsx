import React, { FC } from 'react';
import { CharacterAttributes } from '@/redux/slices/hpApi';

interface DetailsParams {
  handleClose: () => void;
  detailsData: CharacterAttributes;
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

      {detailsData?.image ? (
        <div className="details__image">
          <img src={detailsData.image} alt="character image" />
        </div>
      ) : null}

      {detailsData ? (
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
