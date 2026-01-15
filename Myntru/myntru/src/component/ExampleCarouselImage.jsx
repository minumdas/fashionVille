import couponImg from '../coupon.png';


const ExampleCarouselImage = ({ text }) => {
  return (
    <img
      className="d-block w-100"
      src={couponImg}
      alt={text}
    />
  );
};

export default ExampleCarouselImage;