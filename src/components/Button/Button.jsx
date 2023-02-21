import { ButtonStyled } from './Button.styled';

export const Button = ({ onLoadMore }) => {
  return (
    <ButtonStyled type="button" onClick={() => onLoadMore()}>
      Load more
    </ButtonStyled>
  );
};
