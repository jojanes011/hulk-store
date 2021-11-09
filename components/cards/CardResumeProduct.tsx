import Image from 'next/image';
import { Tooltip } from '@mui/material';

interface CardResumeProductInterface {
  product: any;
  add: any;
  remove: any;
  removeAll: any;
  cart: Array<any>;
}

const CardResumeProduct = ({
  product,
  add,
  remove,
  removeAll,
  cart,
}: CardResumeProductInterface) => (
  <div className='flex flex-col border-b border-black space-y-2'>
    <div className='flex flex-col sm:flex-row justify-between content-center items-center flex-wrap space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 text-black hover:shadow-sm'>
      <div className='flex-none sm:w-28 sm:h-28 w-40 h-40 relative place-self-center rounded-md'>
        <Image
          src={
            product?.imagePath ? '/img/camiseta1.jpg' : '/img/defaultImage.jpg'
          }
          alt={product.name}
          layout='fill'
          objectFit='cover'
          quality={100}
          className=' rounded-md'
        />
      </div>
      <div className='w-full sm:w-2/6 flex flex-col text-center sm:text-left'>
        <div className='font-semibold text-md md:text-xl tracking-wide font-avenir capitalize max-h-14 break-all overflow-hidden w-full'>
          {product.name}
        </div>
        <div className='text-black font-semibold text-lg max-h-7'>
          c/u {cart.find((itemCart) => itemCart.id === product.id).price}
        </div>
        <div className='text-black font-semibold text-lg max-h-7'>
          Stock: {product.stock}
        </div>
      </div>
      <div className='w-full sm:w-1/6 flex flex-row justify-between items-center rounded-xl h-8 border-2 border-gray-100 shadow-md text-xl bottom-0'>
        <button
          type='button'
          onClick={() => remove(product.uid)}
          className={`${product.quantity >= 2 ? ' block' : ' hidden'}  `}
        >
          <i className='fas fa-minus-circle hover:text-red-700' />
        </button>
        <button
          type='button'
          onClick={() => remove(product.uid)}
          className={`${product.quantity <= 1 ? ' block' : ' hidden'}`}
        >
          <i className='far fa-trash-alt text-red-700 ' />
        </button>
        <span>{product.quantity}</span>
        <button type='button' onClick={() => add(product)}>
          <i className='fas fa-plus-circle hover:text-primary' />
        </button>
      </div>
      <div className='flex-grow text-center text-black font-semibold text-lg max-h-7'>
        $
        {new Intl.NumberFormat('de-DE').format(
          product.price * product.quantity
        )}
      </div>
      <Tooltip className='block sm:hidden md:block' title='Eliminar orden'>
        <button type='button' onClick={() => removeAll(product.id)}>
          <i className='fas fa-times-circle text-2xl text-red-700' />
        </button>
      </Tooltip>
    </div>
  </div>
);

export default CardResumeProduct;
