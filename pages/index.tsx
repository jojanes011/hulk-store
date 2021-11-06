import CardPromotion from '@components/cards/CardPromotion';
import matchRoles from 'utils/matchRoles';
import safeJsonStringify from 'safe-json-stringify';
import prisma from 'config/prisma';
import CardProduct from '@components/cards/CardProduct';

export async function getServerSideProps(context) {
  const { rejected, isPublic, name } = await matchRoles(context);
  const categories = await prisma.category.findMany();
  const products = await prisma.product.findMany({
    include: {
      Category: true,
    },
  });
  return {
    props: {
      rejected,
      isPublic,
      name,
      categories: JSON.parse(safeJsonStringify(categories)),
      products: JSON.parse(safeJsonStringify(products)),
    },
  };
}

const Home = ({ categories = [], products = [] }) => (
  <div className='flex flex-col space-y-4'>
    <div className='bg-background bg-contain flex flex-col md:flex-row space-y-4 md:space-x-4 padding-screen py-8'>
      <CardPromotion
        classNameCard='w-full sm:w-1/2 lg:w-2/3 bg-black text-white'
        classNameButton='bg-white text-black'
        title='Camiseta de Capitán America'
        description='Tela en algodón, todas las tallas a precio de costo. No dejes pasar esta oferta.'
      />
      <CardPromotion
        classNameCard='w-full sm:w-1/2 lg:w-1/3 bg-primary'
        classNameButton='bg-black text-white'
        title='Camiseta de Capitán America'
        description='Tela en algodón, todas las tallas a precio de costo.'
      />
    </div>
    <div className='flex flex-col space-y-4 padding-screen'>
      <div>
        <h1 className='uppercase font-semibold text-2xl'>Productos</h1>
      </div>
      <div className='flex flex-row items-center justify-between'>
        <div className='hidden md:flex flex-row items-center space-x-4'>
          <button type='button' className='text-primary'>
            Todas
          </button>
          <span>|</span>
          {categories.map((category) => (
            <>
              <button type='button' className='font-light'>
                {category?.name}
              </button>
              <span>|</span>
            </>
          ))}
        </div>
        <div className='flex md:hidden'>
          <select name='select' className='py-2 px-4 border border-black'>
            <option value='Todas' selected>
              Todas
            </option>
            {categories.map((category) => (
              <option value={category?.name}>{category?.name}</option>
            ))}
          </select>
        </div>
        <div>
          <button
            type='button'
            className='h-8 w-8 text-text hover:text-black border border-text hover:border-black'
          >
            <i className='fas fa-chevron-left text-sm ' />
          </button>
          <button
            type='button'
            className='h-8 w-8 text-text hover:text-black border border-text hover:border-black'
          >
            <i className='fas fa-chevron-right text-sm ' />
          </button>
        </div>
      </div>
      <div className='border border-t-4 border-black h-px' />
      <div className='grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-12'>
        {products.map((product) => (
          <CardProduct
            name={product?.name}
            price={product?.price}
            image={product?.imagePath}
            key={product?.id}
          />
        ))}
      </div>
    </div>
  </div>
);

export default Home;
