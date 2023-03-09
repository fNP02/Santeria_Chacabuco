import { useProducts } from "../../store/Products";

export const ProductsTable = ({productsAll}) => {
  return (
    <table>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Variantes</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          {productsAll.map((product) => (
            <tr key={product._id}>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>{product.title}</td>
              <td>{product.categoryId.name}</td>
              <td>
                {product.variants.length}
                {/* {product.variants?.map((variant) => (

                <span key={variant._id}>{`(${variant.colorsId[0]?.name??''}, ${variant.sizesId[0]?.size??''}): ${variant.price} - `}</span>
              ))} */}
              </td>
              {/* <td>{`${(product.variants.length==1)?product.variants[0]?.price:'-'}`}</td> */}
              <td>{`${product.variants[0]?.price || ""} ${
                product.variants[0]?.price && product.variants.length > 1
                  ? product.variants[product.variants.length - 1]?.price
                    ? " - "
                    : ""
                  : ""
              } ${
                product.variants.length > 1
                  ? product.variants[product.variants.length - 1]?.price || ""
                  : ""
              }`}</td>
            </tr>
          ))}
        </tbody>
      </table>
  )
}
