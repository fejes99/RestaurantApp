import React from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { listProductsByCategories } from '../actions/productActions';

const Category = ({ category }) => {
  const dispatch = useDispatch();

  const setCategoryHandler = () => {
    dispatch(listProductsByCategories(category.id));
  };

  return (
    <div>
      <Button
        onClick={setCategoryHandler}
        variant="outline-info"
        className="rounded"
        type="button"
      >
        {category.name}
      </Button>
    </div>
  );
};

export default Category;
