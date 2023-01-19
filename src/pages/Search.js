import axios from "axios";
import { React, useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Api_Url } from "../utils/constants";
import { Empty } from "../components/search/index";
import { CardProduct, Loading } from "../components/menu";

const MapProduct = ({ dataSearch, addCart, updateHaightCategory }) => {
  return (
    <>
      <div className="w-[90%] mx-auto">
        {dataSearch.length === 0 ? (
          <Empty />
        ) : (
          <div className="pb-[2.3rem]">
            <CardProduct
              products={dataSearch}
              addCart={addCart}
              updateHaightCategory={updateHaightCategory}
            />
          </div>
        )}
      </div>
    </>
  );
};

const Search = ({ addCart, updateHaightCategory }) => {
  const { input } = useParams();
  const [product, setProduct] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const getApiProduct = async () => {
      setActive(true);
      await axios
        .get(`${Api_Url}products`)
        .then(res => {
          let data = res.data;
          setProduct(data);
          setActive(false);
        })
        .catch(() => {
          setActive(false);
        });
    };

    getApiProduct();
  }, []);

  const filterByNama = useCallback((value) => {
    let data = product.filter(product => product.nama.includes(value));
    setDataSearch(data);
  }, [product])

  const filterByCategory = useCallback((value) => {
    let data = product.filter(product => product.category.nama.toLowerCase().includes(value));
    setDataSearch(data);
  }, [product])

  const updateFormInput = useCallback((value) => {
    if (value === "coffe" || value === "kopi") return filterByCategory("coffe");
    if (value === "snack" || value === "cemilan") return filterByCategory("cemilan");
    if (value === "food" || value === "makanan") return filterByCategory("makanan");
    if (value === "minuman") return filterByCategory("juice");
    return filterByNama(value);
  }, [filterByNama, filterByCategory]);

  useEffect(() => {
    updateFormInput(input.toLowerCase());
  }, [updateFormInput, input]);

  return (
    <>
      <div className="bg-green"></div>

      {!active ? (
        <MapProduct
          dataSearch={dataSearch}
          addCart={addCart}
          updateHaightCategory={updateHaightCategory}
        />
      ) : (
        <div className="w-[90%] mx-auto py-5">
          <Loading />
        </div>
      )}
    </>
  );
};

export default Search;
