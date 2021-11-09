import { useMutation } from '@apollo/client';
import { Dialog } from '@mui/material';
import { useToast } from 'context/toast';
import useFormData from 'hooks/useFormData';
import { useRouter } from 'next/router';
import React from 'react';
import { CREATE_PRODUCT, UPDATE_PRODUCT } from 'utils/gql/mutations';
import {
  createProductTransformation,
  updateProductTransformation,
} from 'utils/gql/transformations/productTransformation';
import Image from 'next/image';
import { uploadFormFiles } from 'utils/uploadS3';
import { nanoid } from 'nanoid';

interface ModalFormProductInterface {
  open: boolean;
  onOpenModalForm: any;
  onLoading: any;
  product?: any;
  categories?: any;
}

const ModalFormProduct = ({
  open = false,
  onOpenModalForm = () => {},
  onLoading = () => {},
  product = {},
  categories = [],
}: ModalFormProductInterface) => {
  const { form, formData, updateFormData } = useFormData(null);
  const [mutationUpdateCreateProduct] = useMutation(CREATE_PRODUCT);
  const [mutationUpdateProduct] = useMutation(UPDATE_PRODUCT);
  const { setToastState }: any = useToast();
  const router = useRouter();

  const submitForm = async (e) => {
    e.preventDefault();
    onLoading(true);
    onOpenModalForm(false);
    if (Object.keys(product).length > 0) {
      onEdit();
      return;
    }
    onCreate();
  };

  const onCreate = async () => {
    const formUploaded = await uploadFormFiles(
      formData,
      `imagenes`,
      `${nanoid()}.png`
    );
    const data = createProductTransformation(formUploaded);
    mutationUpdateCreateProduct({
      variables: {
        data,
      },
    })
      .then(() => {
        setToastState({
          message: '¡Éxito!',
          type: 'success',
        });
        onLoading(false);
        router.replace(router.asPath);
      })
      .catch(() => {
        setToastState({
          message: 'Hubo un error. Por favor, vuelve a intentarlo más tarde.',
          type: 'error',
        });
        onLoading(false);
      });
  };

  const onEdit = () => {
    const data = updateProductTransformation(formData);
    mutationUpdateProduct({
      variables: {
        where: {
          id: product?.id,
        },
        data,
      },
    })
      .then(() => {
        setToastState({
          message: '¡Éxito!',
          type: 'success',
        });
        onLoading(false);
        router.replace(router.asPath);
      })
      .catch(() => {
        setToastState({
          message: 'Hubo un error. Por favor, vuelve a intentarlo más tarde.',
          type: 'error',
        });
        onLoading(false);
      });
  };

  return (
    <Dialog
      open={open}
      onClose={() => onOpenModalForm(false)}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <h2 className='font-bold uppercase text-lg p-5 text-primary'>
          Producto
        </h2>
        <div className='h-px bg-primary' />
        <div className='flex flex-col gap-6 md:grid-cols-2 p-4'>
          <div className='flex flex-col items-center'>
            {Object.keys(product).length > 0 && (
              <div className='relative h-36 w-24'>
                <Image
                  src={product?.imagePath ?? '/img/defaultImage.jpg'}
                  layout='fill'
                />
              </div>
            )}
          </div>
          <div>
            <label className='text-black font-semibold' htmlFor='product'>
              Nombre*
              <input
                required
                name='name'
                type='text'
                className='capitalize input-form'
                defaultValue={product?.name}
              />
            </label>
          </div>
          <div>
            <label className='text-black font-semibold' htmlFor='price'>
              Existencias*
              <input
                required
                name='stock'
                type='number'
                className='input-form'
                defaultValue={product?.stock}
              />
            </label>
          </div>
          <div>
            <label className='text-black font-semibold' htmlFor='price'>
              Precio*
              <input
                required
                name='price'
                type='number'
                className='input-form'
                defaultValue={product?.price}
              />
            </label>
          </div>
          <div>
            <label className='text-black font-semibold' htmlFor='lote'>
              Descripción*
              <textarea
                required
                name='description'
                cols={5}
                rows={2}
                className='input-form'
                defaultValue={product?.description}
              />
            </label>
          </div>
          <div>
            <input type='file' name='imagePath' />
          </div>
          <div>
            <span className='text-black font-semibold'>Elegir categoría</span>
            <div className='flex flex-col space-y-4'>
              <select
                name='categoryId'
                defaultValue={product?.category?.id}
                className='py-2 px-4 border border-black rounded-md'
              >
                <option value={null}>Selecciona una</option>
                {categories.map((category) => (
                  <option key={category?.id} value={category?.id}>
                    {category?.name}
                  </option>
                ))}
              </select>
              <input
                name='categoryName'
                type='text'
                placeholder='Otra'
                className='block px-4 py-2 text-black bg-white border border-black rounded-md focus:border-primary focus:outline-none focus:ring'
              />
            </div>
          </div>
          <div className='flex flex-row space-x-4 col-span-2'>
            <button
              type='button'
              onClick={() => onOpenModalForm(false)}
              className='btn-cancel'
            >
              CANCELAR
            </button>
            <button type='submit' className='btn-save'>
              ENVIAR
            </button>
          </div>
        </div>
      </form>
    </Dialog>
  );
};

export default ModalFormProduct;
