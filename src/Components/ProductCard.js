/*
 * import for react
 */
import styled from 'styled-components';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CardContainer = styled(Card)`
  height: 550px;
  border: none;
  border-radius: 20px;
  box-shadow: 5px 10px 30px -2px #e2e2e2;
  margin-bottom: 40px;
  margin-left: 5px;
  margin-right: 5px;
  bottom: 0px;
  transition: all ease-out 0.2s 0s;
  color: black;

  &:hover {
    bottom: 10px;
    box-shadow: 5px 10px 40px 10px #e2e2e2;
    transition: all ease-out 0.2s 0s;
  }

  @media only screen and (max-width: 992px) {
    height: 500px;
  }
  @media only screen and (max-width: 768px) {
    margin: 5px 50px;
  }
`;

const CardImage = styled(Card.Img)`
  height: 350px;
  object-fit: cover;
  border-radius: 25px 25px 0 0;
`;

const CardBody = styled(Card.Body)`
  display: flex;
  flex-direction: column;
  padding: 30px;
  justify-content: space-between;
`;

const CardTitle = styled(Card.Title)`
  font-size: 30px;
  font-weight: 700;
  margin-top: 10px;
  @media only screen and (max-width: 992px) {
    font-size: 28px;
  }
  @media only screen and (max-width: 768px) {
    font-size: 26px;
  }
`;

const CardDescription = styled(Card.Text)`
  font-size: 20px;
  @media only screen and (max-width: 992px) {
    font-size: 18px;
  }
  @media only screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const ColumnFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RowFlex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductCard = ({ product }) => {
  return (
    <Link to={`/detail/${product.postid}`}>
      <CardContainer>
        <CardImage variant='top' src={product.photoURL} />
        <CardBody>
          <ColumnFlex>
            <CardTitle>{product.title}</CardTitle>
            <CardDescription>{product.content}</CardDescription>
          </ColumnFlex>

          <RowFlex>
            <CardDescription>{product.totalPrice / product.totalPartNum}원</CardDescription>
            <CardDescription style={{ color: 'red' }}>♡ {product.liked}</CardDescription>
          </RowFlex>
        </CardBody>
      </CardContainer>
    </Link>
  );
};

export default ProductCard;
