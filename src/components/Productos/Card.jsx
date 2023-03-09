import { useParams } from "react-router-dom";
import { useProducts } from "../../store/Products";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Header from "../Home/Header/Header";

export const Card = () => {
  // const [product, setProduct] = useState([])
  const { productsAll, products, setProductsAll } = useProducts();
  // const { getPosts } = useProducts();
  let product = [];
  const { productId } = useParams();

  const [data, setData] = useState([])
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    fetch(`https://santeriachacabuco1.up.railway.app/api/productos/${productId}`)
    .then((response)=>response.json())
    .then((data)=>{setData(data.data)
    setUrl(data.data.variants[0].imagesId[0].url)})
    .then(setLoading(false))
  }, []);

  // useEffect(() => {
  // product = productsAll.find((product) => product._id == productId);
  // }, [productsAll]);

  // console.log(data);
  // console.log(url);

  if(loading){return 'cargando'}

  return (
    <>
    <Header/>
    <div className="productCard">
      <div className="div-volver">
        <Link data-active="index" to="/productos">
          {"<"} Volver
        </Link>
      </div>
      <div className="div-product">
        <div className="div-img">
          <img
            className="img"
            src={url}
            alt={data.title}
          />
        </div>
        <div className="caption">
          <h1 className="title">{data.title}</h1>
          <hr />
          <p className="price">
            $ <span>{data._id}</span>
          </p>
          <hr />
          <h3 className="description">{data.description}</h3>
        </div>
      </div>
    </div>
    </>
  );
};
