import Head from "next/head";
import styles from "styles/Home.module.css";
import Link from "next/link";
import Image from "next/image";
import Api from "api/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactLoading from "react-loading";
import moment from "moment";
import mockupdata from "components/data";
import ProductCard from "components/ProductCard";
import SelectBox from "components/SelectBox";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [progressStatus, setProgressStatus] = useState(false);

  const [productName, setProductName] = useState("");
  const [productState, setProductState] = useState("");
  const [productCity, setProductCity] = useState("");

  const [productNameList, setProductNameList] = useState([]);
  const [productStateList, setProductStateList] = useState([]);
  const [productCityList, setProductCityList] = useState([]);

  // useEffect(() => {
  //   setProgressStatus(true);
  //   Api.getProducts()
  //     .then((response) => {
  //       setProducts(response);
  //       setProgressStatus(false);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       setProgressStatus(false);
  //       toast.error(err.message);
  //     });
  // }, []);

  const onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  useEffect(() => {
    let nameArr = mockupdata.map(function (item) {
      return item.product_name;
    });
    let stateArr = mockupdata.map(function (item) {
      return item.address.state;
    });
    let cityArr = mockupdata.map(function (item) {
      return item.address.city;
    });

    setProductNameList(nameArr.filter(onlyUnique));
    setProductStateList(stateArr.filter(onlyUnique));
    setProductCityList(cityArr.filter(onlyUnique));
  }, []);

  const handleChangeSelect = (e, type) => {
    if (type === "productName") {
      setProductName(e.target.value);
    }
    if (type === "productState") {
      setProductState(e.target.value);
    }
    if (type === "productCity") {
      setProductCity(e.target.value);
    }
  };

  useEffect(() => {
    let _products = [];
    if (productName !== "" && productState !== "" && productCity !== "") {
      mockupdata.map((item) => {
        if (
          item.product_name === productName &&
          item.address.state === productState &&
          item.address.city === productCity
        ) {
          _products.push(item);
        }
      });
    }
    if (productName !== "" && productState !== "" && productCity === "") {
      mockupdata.map((item) => {
        if (
          item.product_name === productName &&
          item.address.state === productState
        ) {
          _products.push(item);
        }
      });
    }
    if (productName !== "" && productState === "" && productCity === "") {
      mockupdata.map((item) => {
        if (item.product_name === productName) {
          _products.push(item);
        }
      });
    }
    if (productName === "" && productState !== "" && productCity !== "") {
      mockupdata.map((item) => {
        if (
          item.address.state === productState &&
          item.address.city === productCity
        ) {
          _products.push(item);
        }
      });
    }
    if (productName === "" && productState !== "" && productCity === "") {
      mockupdata.map((item) => {
        if (item.address.state === productState) {
          _products.push(item);
        }
      });
    }
    if (productName === "" && productState === "" && productCity !== "") {
      mockupdata.map((item) => {
        if (item.address.city === productCity) {
          _products.push(item);
        }
      });
    }
    if (productName === "" && productState === "" && productCity === "") {
      mockupdata.map((item) => {
        _products.push(item);
      });
    }
    setProducts(_products);
  }, [productName, productState, productCity]);

  return (
    <div>
      <div className={styles.container}>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3 p-1 xs:col-span-12">
            <div className={styles.filterContainer}>
              <div className={styles.filterTitle}>Filters</div>
              <div className={styles.divider + " mt-3 mb-6"}></div>
              <div className="mt-3">
                <SelectBox
                  list={productNameList}
                  value={productName}
                  handleChange={(e) => handleChangeSelect(e, "productName")}
                />
              </div>
              <div className="mt-3">
                <SelectBox
                  list={productStateList}
                  value={productState}
                  handleChange={(e) => handleChangeSelect(e, "productState")}
                />
              </div>
              <div className="mt-3">
                <SelectBox
                  list={productCityList}
                  value={productCity}
                  handleChange={(e) => handleChangeSelect(e, "productCity")}
                />
              </div>
            </div>
          </div>
          <div className="col-span-9 p-3 xs:col-span-12">
            <div className={styles.headerTitle}>Edvora</div>
            <div className={styles.productTitle}>Products</div>
            {products.length > 0 ? (
              <div
                className={
                  styles.productContainer + " grid grid-cols-12 gap-4 mt-5"
                }
              >
                {products.map((item, index) => (
                  <div
                    className="col-span-12 lg:col-span-4 md:col-span-4 sm:col-span-6 xs:col-span-12"
                    key={index}
                  >
                    <ProductCard item={item} />
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.productTitle}>No Products!</div>
            )}
          </div>
        </div>
      </div>
      {progressStatus && (
        <div className={styles.loadingArea}>
          <div className={styles.loading}>
            <ReactLoading type={"spinningBubbles"} color="#006600" />
          </div>
        </div>
      )}
    </div>
  );
}
