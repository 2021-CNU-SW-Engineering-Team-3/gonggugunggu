import { useState, useEffect } from 'react';

const StarRate = () => {
  const starRatingState = [];

  const [starRatingOnOff, setStarRatingOnOff] = useState(starRatingState);

  const mouseOverStarRating = (index) => {
    const tempStarRating = [];
    for (let i = 0; i < 5; i++) {
      if (i < index) {
        tempStarRating.push('item-rating pointer zmdi zmdi-star');
      } else {
        tempStarRating.push('item-rating pointer zmdi zmdi-star-outline');
      }
    }
    setStarRatingOnOff(tempStarRating); //새로운 state를 세팅한다.
  };

  useEffect(() => {
    for (let i = 0; i < 5; i++) {
      starRatingState.push('item-rating pointer zmdi zmdi-star-outline');
    }
    setStarRatingOnOff(starRatingState);
  }, []);

  return (
    <>
      <i className={starRatingOnOff[0]} onMouseOver={() => mouseOverStarRating(0)} />
      <i className={starRatingOnOff[1]} onMouseOver={() => mouseOverStarRating(1)} />
      <i className={starRatingOnOff[2]} onMouseOver={() => mouseOverStarRating(2)} />
      <i className={starRatingOnOff[3]} onMouseOver={() => mouseOverStarRating(3)} />
      <i className={starRatingOnOff[4]} onMouseOver={() => mouseOverStarRating(4)} />
    </>
  );
};

export default StarRate;
