import styles from "styles/Home.module.css";
import Image from "next/image";
import moment from "moment";

const ProductCard = (props) => {
  const { item } = props;
  return (
    <div className={styles.productCard}>
      <div className="flex flex-wrap justify-start items-center">
        <div style={{ width: "70px", height: "70px" }}>
          <Image
            src={item.image}
            width={70}
            height={70}
            alt=""
            className={styles.productImage}
          />
        </div>
        <div className="ml-5 flex flex-col justify-between">
          <div className={styles.cardName}>{item.product_name}</div>
          <div className={styles.cardBrandNamePrice}>{item.brand_name}</div>
          <div className={styles.cardBrandPrice}>$&nbsp;{item.price}</div>
        </div>
      </div>
      <div className={"mt-3"}>
        <div className="flex flex-wrap justify-start items-center">
          <div className={styles.cardBrandNamePrice}>
            {item.address.city}&nbsp;{item.address.state}
          </div>
          <div className="ml-5 flex justify-start items-center">
            <div className={styles.cardBrandNamePrice}>Date: </div>
            <div className={styles.cardBrandNamePrice}>
              {moment(item.date).format("DD:MM:YYYY")}
            </div>
          </div>
        </div>
        <div className={styles.cardDescription}>{item.discription}</div>
      </div>
    </div>
  );
};

export default ProductCard;
