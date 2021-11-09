import CardPromotion from '@components/cards/CardPromotion';
import matchRoles from 'utils/matchRoles';
import safeJsonStringify from 'safe-json-stringify';
import prisma from 'config/prisma';
import CardProduct from '@components/cards/CardProduct';
import Categories from '@components/Categories';
import { useState } from 'react';
import downloadUrl from 'utils/accessAWS';
// import Pagination from '@components/Pagination';

export async function getServerSideProps(context) {
  const { rejected, isPublic, name } = await matchRoles(context);
  const categories = await prisma.category.findMany();
  const productsBD = await prisma.product.findMany({
    where: {
      NOT: {
        stock: {
          equals: 0,
        },
      },
    },
    include: {
      category: true,
    },
  });
  const products = await Promise.all(
    productsBD.map(async (product) => ({
      ...product,
      imagePath: await downloadUrl(product.imagePath, 'image'),
      // imagePath: await downloadUrl(),
    }))
  );

  return {
    props: {
      rejected,
      isPublic,
      name,
      categories: JSON.parse(safeJsonStringify(categories)),
      productsDB: JSON.parse(safeJsonStringify(products)),
    },
  };
}

const Home = ({ categories = [], productsDB = [] }) => {
  const [products, setProducts] = useState(productsDB);

  const handleFilter = (category) => {
    if (category === 'Todas') {
      setProducts(productsDB);
      return;
    }
    const filter = productsDB.filter(
      (product) => product?.category?.name === category
    );
    setProducts(filter);
  };

  return (
    <div className='flex flex-col space-y-4'>
      <div className='bg-background bg-contain flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 padding-screen py-8'>
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
          <Categories categories={categories} onFilter={handleFilter} />
          {/* <Pagination onPaginateItems={setProducts} items={products} /> */}
        </div>
        <div className='border border-t-4 border-black h-px' />
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-12'>
          {products.length > 0 ? (
            products.map((product) => (
              <CardProduct product={product} key={product?.id} />
            ))
          ) : (
            <div className='flex flex-col space-y-8 items-center col-span-full text-tertiary'>
              <span className='text-4xl font-bold text-center w-full md:w-1/2'>
                Ups! No hay ningún articulo para mostrar
              </span>
              <i className='fas fa-box-open text-8xl' />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
