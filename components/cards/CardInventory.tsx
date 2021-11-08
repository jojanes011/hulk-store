import { Tooltip } from '@mui/material';
import React from 'react';
import NumberFormat from 'react-number-format';

interface CardInventoryInterface {
  items: Array<any>;
  onOpenModalForm: any;
  onDeleteItem: any;
}

const CardInventory = ({
  items = [],
  onOpenModalForm = () => {},
  onDeleteItem = () => {},
}: CardInventoryInterface) => (
  <>
    {items.map((item) => (
      <div
        key={item.id}
        className='flex flex-col space-y-2 sm:hidden bg-white border border-primary rounded-lg p-4 my-2 shadow-lg'
      >
        <div className='flex flex-col w-full'>
          <span className='text-primary font-semibold'>Nombre</span>
          <span>{item?.name}</span>
        </div>
        <div className='flex flex-col w-full'>
          <span className='text-primary font-semibold'>Descripción</span>
          <span>{item?.description}</span>
        </div>
        <div className='flex flex-col w-full'>
          <span className='text-primary font-semibold'>Precio</span>
          <span>
            <NumberFormat
              value={item?.price}
              className='foo'
              displayType='text'
              thousandSeparator
              prefix='$'
              renderText={(value) => <div>{value}</div>}
            />
          </span>
        </div>
        <div className='flex flex-col w-full'>
          <span className='text-primary font-semibold'>Categoría</span>
          <span>{item?.category?.name}</span>
        </div>
        <div className='flex flex-col w-full'>
          <span className='text-primary font-semibold'>Editar</span>

          <Tooltip title='Editar'>
            <button
              onClick={() => onOpenModalForm(true, item)}
              type='button'
              className='py-1 px-3 bg-white border border-primary shadow-lg text-primary rounded-lg focus:outline-none'
            >
              <i className='fas fa-edit text-base' />
            </button>
          </Tooltip>
        </div>
        <div className='flex flex-col w-full'>
          <span className='text-primary font-semibold'>Eliminar</span>
          <Tooltip title='Eliminar'>
            <button
              onClick={() => onDeleteItem(item?.id)}
              type='button'
              className='py-1 px-3 bg-white border border-red-600 shadow-lg text-red-600 rounded-lg focus:outline-none'
            >
              <i className='fas fa-trash text-base' />
            </button>
          </Tooltip>
        </div>
      </div>
    ))}
  </>
);

export default CardInventory;
