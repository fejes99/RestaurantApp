import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listCategories, listProducts } from '../actions/productActions.js';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const HomeScreen = () => {
  const [categoryId, setCategoryId] = useState('');

  const dispatch = useDispatch();
  const { keyword } = useParams();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const categoryList = useSelector((state) => state.categoryList);
  const {
    loading: loadingCategory,
    error: errorCategory,
    categories,
  } = categoryList;

  useEffect(() => {
    dispatch(listProducts(keyword, categoryId));
    dispatch(listCategories());
  }, [dispatch, categoryId, keyword]);

  const categoryHandler = (categoryId) => {
    setCategoryId(categoryId);
  };

  return (
    <div>
      {loadingCategory ? (
        <Loader />
      ) : errorCategory ? (
        <Message variant="danger">{errorCategory}</Message>
      ) : (
        <Row className="mb-3">
          <h1>Categories</h1>
          {categories.map((category) => (
            <Col lg={1}>
              <Button
                variant="outline-info"
                className="rounded"
                type="button"
                key={category.id}
                onClick={() => categoryHandler(category.id)}
              >
                {category.name}
              </Button>
            </Col>
          ))}
        </Row>
      )}
      {!keyword ? <h1>Latest products</h1> : <h1>Products for: {keyword}</h1>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default HomeScreen;
