import Image from 'next/image';
import NumberFormat from 'react-number-format';

interface CardProductInterface {
  name: string;
  price: number;
  image?: string;
  classNameCard?: string;
}

const CardProduct = ({
  name = '',
  image = null,
  price = 0,
  classNameCard = '',
}: CardProductInterface) => (
  <div
    className={`${classNameCard} flex flex-col p-2 shadow-xl border border-black rounded-md`}
  >
    <div className='relative h-44 w-full'>
      <Image src={image ?? '/img/defaultImage.jpg'} layout='fill' />
    </div>
    <div className='break-words font-bold text-gray-800'>
      <h2>{name}</h2>
    </div>
    <div className='break-words font-extrabold text-lg'>
      <NumberFormat
        value={price}
        className='foo'
        displayType='text'
        thousandSeparator
        prefix='$'
        renderText={(value) => <div>{value}</div>}
      />
    </div>
  </div>
);

export default CardProduct;
