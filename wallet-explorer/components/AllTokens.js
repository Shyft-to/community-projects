import Token from "./Token";
import styles from "@/styles/Token.module.css";
const AllTokens = () => {
  return (
    <div>
      <div className={styles.token_section}>
        <div className={styles.main_heading}>
            Tokens in your Space<span>(19 Tokens)</span>
        </div>
        <div className="d-flex justify-content-start">
          <Token />
          <Token />
          <Token />
          <Token />
        </div>
      </div>
    </div>
    
  );
};

export default AllTokens;
