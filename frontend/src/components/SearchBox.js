import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setKeyword('');
    } else {
      navigate('/');
    }
  };

  return (
    <Form className="d-flex" onSubmit={submitHandler}>
      <Form.Control
        type="text"
        name="q"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="search-button">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
