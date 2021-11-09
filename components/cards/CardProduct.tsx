import { CartContext } from 'context/cart';
import Image from 'next/image';
import { useContext } from 'react';
import NumberFormat from 'react-number-format';

interface CardProductInterface {
  product: any;
  classNameCard?: string;
}

const CardProduct = ({
  product = {},
  classNameCard = '',
}: CardProductInterface) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div
      className={`${classNameCard} flex flex-col filter drop-shadow-lg justify-between bg-white border border-opacity-70 rounded-md transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110`}
    >
      <div className='relative h-44 w-full'>
        <Image
          src={product?.imagePath ?? '/img/defaultImage.jpg'}
          layout='fill'
        />
      </div>
      <div className='break-words font-bold text-gray-700 px-2'>
        <h2>{product?.name}</h2>
      </div>
      <div className='break-words font-extrabold text-lg px-2'>
        <NumberFormat
          value={product?.price}
          className='foo'
          displayType='text'
          thousandSeparator
          prefix='$'
          renderText={(value) => <div>{value}</div>}
        />
      </div>
      <button
        onClick={() => addToCart(product)}
        className='p-2 w-full bg-primary text-white rounded-br-md rounded-bl-md hover:bg-black font-semibold'
        type='button'
      >
        Comprar
      </button>
    </div>
  );
};

export default CardProduct;
