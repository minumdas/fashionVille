import Carousel from 'react-bootstrap/Carousel';
import lady_sunglass from '../images/lady_sunglass.webp';
import lady_wallet from '../images/lady_wallet.jpg';
import lady_shoe from '../images/lady_shoe.jpg';
import lady_leatherbelt from '../images/lady_leatherbelt.jpg';
import women_watch from '../images/women_watch.jpg';
import dresses from '../images/dresses.jpg';
import coordset from '../images/coordset.jpg';
import Western from '../images/Western.jpg';
import kurtiset from '../images/Kurtiset.jpg';

const categories = [
   { title: 'Sunglass', img: lady_sunglass, desc: 'Stylish coord sets' },  
   { title: 'Dress', img: dresses, desc: 'Stylish coord sets' },  
   { title: 'Coordset', img: coordset, desc: 'Stylish coord sets' },  
  { title: 'Western', img: Western, desc: 'Stylish coord sets' },  
  { title: 'Wallet', img: lady_wallet, desc: 'Trendy kids wear' },
  { title: 'Kurti Set', img: kurtiset, desc: 'Modern western styles' },
  { title: 'Belt', img: lady_leatherbelt, desc: 'Ethnic kurtis' },
  { title: 'Shoe', img: lady_shoe, desc: 'Perfect combos' },
  { title: 'Watch', img: women_watch, desc: 'Stylish coord sets' },
];

// chunk cards per slide
const chunkSize = 4;
const slides = [];
for (let i = 0; i < categories.length; i += chunkSize) {
  slides.push(categories.slice(i, i + chunkSize));
}
const ShopForWomen = () => {
  return (
     <div className="container my-4">
     
      <Carousel
        indicators={false}
        controls={true}
        interval={3000}
        pause="hover"
      >
        {slides.map((group, idx) => (
          <Carousel.Item key={idx}>
            <div className="category-grid">
              {group.map((cat, index) => (
                <div className="category-cell" key={index}>
                  <div className="card category-card">
                    <img
                      src={cat.img}
                      className="card-img-top"
                      alt={cat.title}
                    />
                    <div className="card-body text-center">
                      <h5 className="card-title">{cat.title}</h5>
                      <p className="card-text">{cat.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}

export default ShopForWomen