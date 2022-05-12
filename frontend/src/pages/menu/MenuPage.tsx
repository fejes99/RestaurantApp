import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Product } from '../../components';
import { listProducts } from '../../redux/actions/productActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

const MenuPage = () => {
  const dispatch = useAppDispatch();

  const productList = useAppSelector((state) => state.products);
  const { products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MenuPage;
