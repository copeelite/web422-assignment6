import { useShoppingCart } from "@/context/ShoppingCartContext";
import React, { useEffect, useState } from "react";
import { Modal, Button, Table } from "react-bootstrap"; // Import React Bootstrap components

export default function ProductDetail() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [quantity, setQuantity] = useState(0); // state to hold quantity
  

  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();


  useEffect(() => {
    // Fetch all products data when the component mounts
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  
  const handleRowClick = (product) => {
    setSelectedProduct(product);
  };

  const handleModalClose = () => {
    setSelectedProduct(null);
  };


  // useEffect for updating quantity whenever selectedProduct changes
  useEffect(() => {
    if (selectedProduct) {
      setQuantity(getItemQuantity(selectedProduct.id));
    }
  }, [selectedProduct, getItemQuantity]);


  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Products</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by Product Title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        {" "}
        {/* Add this div with table-responsive class */}
        <table className="table table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Description</th>
              <th>Image</th>
              <th>Category</th>
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                onClick={() => handleRowClick(product)}
                style={{ cursor: "pointer" }}
              >
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>{product.description}</td>
                <td>
                  <img src={product.image} alt={product.title} width="50" />
                </td>
                <td>{product.category}</td>
                <td>
                  {product.rating.rate} ({product.rating.count} reviews)
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={selectedProduct !== null} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct && selectedProduct.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <div>
              {/* <strong>Title:</strong> {selectedProduct.title}<br /> */}
              <strong>Price:</strong> ${selectedProduct.price}
              <br />
              <strong>Description:</strong> {selectedProduct.description}
              <br />
              <strong>Category:</strong> {selectedProduct.category}
              <br />
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                width="200"
                className="mt-2"
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="mt-auto">
            {quantity === 0 ? (
              <Button onClick={() => increaseCartQuantity(selectedProduct)}>
                + Add To Cart
              </Button>
            ) : (
              <div
                className="d-flex align-items-center flex-column"
                sytle={{ gap: ".5rem" }}
              >
                <div
                  className="d-flex align-items-center flex-row"
                  sytle={{ gap: ".5rem" }}
                >
                  <Button
                    onClick={() => decreaseCartQuantity(selectedProduct)}
                  >
                    -
                  </Button>
                  <div>
                    <span className="fs-3 ms-2">{quantity}</span>
                    <span className="me-2">in Cart</span>
                  </div>
                  <Button
                    onClick={() => increaseCartQuantity(selectedProduct)}
                  >
                    +
                  </Button>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeFromCart(selectedProduct.id)}
                >
                  Remove
                </Button>
              </div>
            )}
          </div>

          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
