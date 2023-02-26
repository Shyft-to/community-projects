import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import Token from "./Token";
import styles from "../resources/css/Token.module.css";
const AllTokens = () => {
  return (
    <div>
      <div className={styles.token_section}>
        <div className={styles.main_heading}>
            Tokens in your Space<span>(19 Tokens)</span>
        </div>
        <OwlCarousel 
                    className='owl-theme' 
                    margin={40} 
                    nav={true}
                    // dotClass={TestStyles.grad_dot}
                    responsive={{
                        0:{
                            items:1
                        },
                        768:{
                            items:3
                        },
                        1100:{
                            items:9
                        }
                    }}
                    dots
                    autoplay
                >
                  <Token />
                  <Token />
                  <Token />
                  <Token />
                </OwlCarousel>
          
        
      </div>
    </div>
    
  );
};

export default AllTokens;
