/*
 * import for react
 */
import { useHistory, useParams } from 'react-router-dom';

const Detail = ({ data }) => {
  let { id } = useParams();
  let findProduct = data.find((item) => {
    return Number(item.id) === Number(id);
  });

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6'>
          <img src={findProduct.photoURL} alt='product' width='100%' />
        </div>
        <div className='col-md-6 mt-4'>
          <h4 className='pt-5'>{findProduct.title}</h4>
          <p>{findProduct.content}</p>
          <p>{findProduct.price}원</p>
          <button className='btn btn-danger'>공동구매 참여</button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
