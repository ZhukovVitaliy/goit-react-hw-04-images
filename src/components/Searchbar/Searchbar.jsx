import { useState } from 'react';
import { Header, Form, Button, ButtonLabel, Input } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    setQuery(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(query);

    setQuery('');
  };

  return (
    <Header onSubmit={handleSubmit}>
      <Form className="form">
        <Button type="submit" className="button">
          <ButtonLabel className="button-label">Search</ButtonLabel>
        </Button>

        <Input
          className="input"
          type="text"
          name="query"
          value={query}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </Form>
    </Header>
  );
};
