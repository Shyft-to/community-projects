import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

import Token from "./Token";
import styles from "../resources/css/Token.module.css";
const AllTokens = ({tokens,address,network}) => {

  return (
    <div>

      <div className={styles.token_section}>
        <div className={styles.main_heading}>
            Tokens in your Space<span>({tokens.length} Token(s))</span>
        </div>
        {(tokens.length > 0) &&
        <OwlCarousel 
                    className='owl-theme' 
                    margin={40} 
                    nav={true}
                    // dotClass={TestStyles.grad_dot}
                    navClass={[styles.nav_class_color_left,styles.nav_class_color_right]}
                    responsive={{
                        0:{
                            items:1
                        },
                        768:{
                            items:3
                        },
                        1100:{
                            items:7
                        }
                    }}
                    dots={false}
                    autoplay
                >
                  
                  {tokens.map(token => (
                    <Token token={token} address={address} network={network} />
                  ))}
                  {/* <Token /> */}
                </OwlCarousel>
        }  
        {
          (tokens.length < 1) &&
            <div className='pt-2 not_found_text'>
              No Tokens Found
            </div>
        }
      </div>
    </div>
    
  );
};

export default AllTokens;
