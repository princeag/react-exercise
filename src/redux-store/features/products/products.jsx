import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { buyProduct, restockProduct } from "./productsSlice";
import { addToCart, removeFromCart } from "../cart/cartSlice";
import { useState } from "react";

export default function Products() {
  const dispatch = useDispatch();
  const [products, cart] = useSelector((state) => {
    console.log(state);
    return [state.products.products, state.cart.cart];
  }, shallowEqual);
  // const [products, cart] = [state.products.products, state.cart.cart];

  function handleBuyProduct(product, qty) {
    if (product.remainingQuantity >= qty) {
      dispatch(buyProduct({ id: product.id, qty }));
      dispatch(addToCart({ product, qty }));
    }
  }

  function handleRestock(id, qty = 1) {
    const product = products.filter((product) => product.id === id).pop();
    console.log(product);
    if (product.quantity - product.remainingQuantity > 0) {
      dispatch(restockProduct({ id }));
      dispatch(removeFromCart({ product, qty }));
    }
  }

  return (
    <>
      <div
        style={{
          textAlign: "right",
          backgroundColor: "tomato",
          color: "#fff",
          padding: "10px",
          marginBottom: "15px",
        }}
      >
        <b>Cart:</b> {cart.count}
        <a href="#my-cart">Go to cart</a>
      </div>
      <ListProducts
        products={products}
        onBuy={handleBuyProduct}
        onRestock={handleRestock}
      />
      <MyCart products={products} cart={cart} />
    </>
  );
}

function ListProducts({ products, onBuy, onRestock }) {
  const [itemCartQty, setItemCartQty] = useState({});

  const handleItemCartQty = (id, qty) => {
    qty = parseInt(qty, 10);
    setItemCartQty({ ...itemCartQty, [id]: qty });
  };

  const handleQtyBtnClick = (id, type) => {
    const product = products.filter((product) => product.id === id).pop();
    console.log(id, type);
    let qty = itemCartQty[id] ?? 0;
    switch (type) {
      case "-1":
        if (qty > 0) qty -= 1;
        break;
      case "+1":
        if (product.remainingQuantity - qty > 0) qty += 1;
        break;
      default:
        break;
    }
    console.log(id, qty);
    setItemCartQty({
      ...itemCartQty,
      [id]: qty,
    });
  };

  const handleAddToCart = (product) => {
    if (itemCartQty[product.id] > 0) onBuy(product, itemCartQty[product.id]);
    return;
  };

  return (
    <section
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        backgroundColor: "#eee",
      }}
    >
      <h2 style={{ textAlign: "left" }}>List of products</h2>
      <table style={{ width: "100%", textAlign: "left", tableLayout: "fixed" }}>
        <thead>
          <tr>
            <th
              style={{
                textAlign: "left",
                width: "80px",
              }}
            >
              Image
            </th>
            <th>Title</th>
            <th style={{ width: "100px" }}>Price</th>
            <th style={{ width: "100px" }}>Quantity</th>
            <th style={{ width: "100px" }}>Add quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <td style={{ textAlign: "left" }}>
                  <img
                    src={product.src}
                    style={{ width: "70px", borderRadius: "10px" }}
                  />
                </td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>
                  {product.remainingQuantity}/{product.quantity}
                </td>
                <td style={{ width: "100px" }}>
                  <div style={{ display: "flex", justifyContent: "start" }}>
                    <button
                      className="sm-btn"
                      type="button"
                      name="dec_qty"
                      onClick={() => handleQtyBtnClick(product.id, "-1")}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      name="quantity"
                      min="0"
                      value={itemCartQty[product.id] || "0"}
                      style={{
                        width: "30px",
                        borderRadius: "10px",
                        borderWidth: "1px",
                        borderColor: "#ccc",
                        borderStyle: "solid",
                        outline: "none",
                      }}
                      max={product.remainingQuantity}
                      onChange={(e) =>
                        handleItemCartQty(product.id, e.target.value)
                      }
                    />
                    <button
                      className="sm-btn"
                      type="button"
                      name="inc_qty"
                      onClick={() => handleQtyBtnClick(product.id, "+1")}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>
                  <div style={{ display: "flex", alignItems: "baseline" }}>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={
                        (itemCartQty[product.id] ?? 0) == 0 ||
                        product.remainingQuantity == 0
                      }
                    >
                      Add to cart
                    </button>
                    <button
                      onClick={() => onRestock(product.id)}
                      disabled={
                        product.quantity - product.remainingQuantity == 0
                      }
                    >
                      Restock +1
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

function MyCart({ products, cart }) {
  const { count, cartValue, items } = cart;
  return (
    <section
      id="my-cart"
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginTop: "20px",
        backgroundColor: "#ffddee",
      }}
    >
      <h2 style={{ textAlign: "left" }}>Cart {count > 0 && count}</h2>

      {cart.items.length === 0 && <p>No products added yet into the cart.</p>}
      {cart.items.length > 0 && (
        <>
          <table style={{ width: "100%", textAlign: "left" }}>
            <thead>
              <tr>
                <th>No.</th>
                <th
                  style={{
                    textAlign: "left",
                    width: "80px",
                  }}
                >
                  Image
                </th>
                <th>Title</th>
                <th>Price</th>
                <th>Ordered quantity</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => {
                const product = products
                  .filter((product) => product.id === item.id)
                  .pop();
                // console.log(p);
                return (
                  <tr key={item.id}>
                    <td>{i + 1}</td>
                    <td style={{ textAlign: "left" }}>
                      <img
                        src={product.src}
                        style={{ width: "70px", borderRadius: "10px" }}
                      />
                    </td>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.quantity * product.price}</td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan="5" style={{ textAlign: "right" }}>
                  <b>Total Amount: </b>
                </td>
                <td>{cartValue}</td>
              </tr>
            </tbody>
          </table>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              paddingRight: "50px",
              marginTop: "20px",
            }}
          >
            <button
              style={{
                backgroundColor: "skyblue",
                width: "190px",
                color: "#222",
                fontSize: "1.1em",
              }}
            >
              Place order
            </button>
          </div>
        </>
      )}
    </section>
  );
}
