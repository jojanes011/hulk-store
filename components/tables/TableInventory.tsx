import { Tooltip } from '@mui/material';
import React from 'react';
import NumberFormat from 'react-number-format';

interface TableInventoryInterface {
  items: Array<any>;
  // onFilter?: any;
  onOpenModalForm: any;
  onDeleteItem: any;
}

const TableInventory = ({
  items = [],
  onOpenModalForm = () => {},
  onDeleteItem = () => {},
}: TableInventoryInterface) => (
  <div className='hidden sm:block bg-white border border-primary'>
    <table className='hidden sm:table w-full table-auto break-words'>
      <thead>
        <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
          <th className='py-2 px-3 text-center text-primary'>Nombre</th>
          <th className='py-2 px-3 text-center text-primary'>Descripción</th>
          <th className='py-2 px-3 text-center text-primary'>Precio</th>
          <th className='py-2 px-3 text-center text-primary'>Categoria</th>
          <th className='py-2 px-3 text-center text-primary'>Stock</th>
          <th className='py-2 px-3 text-center text-primary'>Acciones</th>
        </tr>
      </thead>
      <tbody className='text-gray-600 text-sm'>
        {items.map((item) => (
          <tr
            className='border-b border-gray-200 hover:bg-gray-100'
            key={item.id}
          >
            <td className='py-1 px-3 text-center'>{item?.name}</td>
            <td className='py-1 px-3 text-center'>{item?.description}</td>
            <td className='py-1 px-3 text-center'>
              <NumberFormat
                value={item?.price}
                className='foo'
                displayType='text'
                thousandSeparator
                prefix='$'
                renderText={(value) => <div>{value}</div>}
              />
            </td>
            <td className='py-1 px-3 text-center'>{item?.category?.name}</td>
            <td className='py-1 px-3 text-center'>{item?.stock}</td>
            <td className='py-1 px-3 text-center flex flex-row space-x-2 justify-center'>
              <Tooltip title='Editar'>
                <button
                  onClick={() => onOpenModalForm(true, item)}
                  type='button'
                  className='py-1 px-3 bg-white border border-primary shadow-lg text-primary rounded-lg focus:outline-none'
                >
                  <i className='fas fa-edit text-base' />
                </button>
              </Tooltip>
              <Tooltip title='Eliminar'>
                <button
                  onClick={() => onDeleteItem(item?.id)}
                  type='button'
                  className='py-1 px-3 bg-white border border-red-600 shadow-lg text-red-600 rounded-lg focus:outline-none'
                >
                  <i className='fas fa-trash text-base' />
                </button>
              </Tooltip>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default TableInventory;
