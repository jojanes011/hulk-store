import React, { useState } from 'react';
import matchRoles from 'utils/matchRoles';
import safeJsonStringify from 'safe-json-stringify';
import prisma from 'config/prisma';
import Search from '@components/inputs/Search';
import TableInventory from '@components/tables/TableInventory';
import CardInventory from '@components/cards/CardInventory';
import ModalFormProduct from '@components/modals/ModalFormProduct';
import Loading from '@components/Loading';
import { useToast } from 'context/toast';
import { useMutation } from '@apollo/client';
import { DELETE_PRODUCT } from 'utils/gql/mutations';
import { useRouter } from 'next/router';
import downloadUrl from 'utils/accessAWS';

export async function getServerSideProps(context) {
  const { rejected, isPublic } = await matchRoles(context);
  const productsBD = await prisma.product.findMany({
    include: {
      category: true,
    },
  });
  const products = await Promise.all(
    productsBD.map(async (product) => ({
      ...product,
      imagePath: await downloadUrl(product.imagePath, 'image'),
    }))
  );
  const categories = await prisma.category.findMany();

  return {
    props: {
      rejected,
      isPublic,
      products: JSON.parse(safeJsonStringify(products)),
      categories: JSON.parse(safeJsonStringify(categories)),
    },
  };
}

const Inventory = ({ products = [], categories = [] }) => {
  const [openModalForm, setOpenModalForm] = useState(false);
  const [productSelected, setProductSelected] = useState({});
  const [loading, setLoading] = useState(false);
  const [mutationDeleteProduct] = useMutation(DELETE_PRODUCT);
  const { setToastState }: any = useToast();
  const router = useRouter();

  const handleOpenModalForm = (val, selected = {}) => {
    setProductSelected(selected);
    setOpenModalForm(val);
  };

  const handleLoading = (val) => {
    setLoading(val);
  };

  const handleDelete = (id) => {
    handleLoading(true);
    mutationDeleteProduct({
      variables: { where: { id } },
    })
      .then(() => {
        setToastState({
          message: '¡Éxito!',
          type: 'success',
        });
        handleLoading(false);
        router.replace(router.asPath);
      })
      .catch(() => {
        setToastState({
          message: 'Hubo un error. Por favor, vuelve a intentarlo más tarde.',
          type: 'error',
        });
        handleLoading(false);
      });
  };

  return (
    <div className='flex flex-col padding-screen space-y-4 mt-4'>
      <h1 className='text-2xl font-bold'>Administrar productos</h1>
      <div className='flex flex-col md:flex-row justify-between space-x-0 md:space-x-10 space-y-4 md:space-y-0'>
        <Search classNameContainer='w-full md:w-1/3' />
        <button
          type='button'
          className='btn-create'
          onClick={() => handleOpenModalForm(true)}
        >
          <span>Nuevo</span>
          <i className='fas fa-plus' />
        </button>
      </div>
      <div>
        <TableInventory
          onDeleteItem={handleDelete}
          items={products}
          onOpenModalForm={handleOpenModalForm}
        />
        <CardInventory
          onDeleteItem={handleDelete}
          items={products}
          onOpenModalForm={handleOpenModalForm}
        />
      </div>
      {openModalForm && (
        <ModalFormProduct
          onLoading={handleLoading}
          product={productSelected}
          categories={categories}
          open={openModalForm}
          onOpenModalForm={handleOpenModalForm}
        />
      )}
      <Loading open={loading} />
    </div>
  );
};

export default Inventory;
