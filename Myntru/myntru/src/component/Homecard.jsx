import sh1 from '../images/kidswear.jpg';
import sh2 from '../images/kidswear1.jpg';
import sh3 from '../images/dress.jpg';
import sh4 from '../images/Teenwear.jpg';
import sh5 from '../images/pantshirt.jpg';

// Image array
const images = [sh1, sh2, sh3, sh4, sh5];

// Name array 
const names = [
  "Kids Wear",
  "Baby Collection",
  "Girls Dress",
  "Teen Fashion",
  "Pant & Shirt"
];

const Homecard = () => {
  return (
    <div className="row g-4">
      {images.map((imgSrc, index) => (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={index}>
          <div className="card h-100 shadow-sm border-0 rounded-4">
            <img
              src={imgSrc}
              className="card-img-top rounded-top-4"
              alt={names[index]}
              style={{ height: '200px', objectFit: 'cover' }}
            />

            <div className="card-body text-center">
              <h5 className="card-title fw-bold">
                {names[index]}
              </h5>

              <p className="card-text text-muted">
                Trendy & comfortable styles
              </p>

              <button className="btn btn-danger fw-bold">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Homecard;