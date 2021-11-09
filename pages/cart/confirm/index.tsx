import { useMutation } from '@apollo/client';
import Loading from '@components/Loading';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { CartContext } from 'context/cart';
import { useToast } from 'context/toast';
import useFormData from 'hooks/useFormData';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { CREATE_PAYMENT, UPDATE_PRODUCT } from 'utils/gql/mutations';
import createPaymentTransformation from 'utils/gql/transformations/paymentTransformation';
import matchRoles from 'utils/matchRoles';

export async function getServerSideProps(context) {
  const { rejected, isPublic } = await matchRoles(context);

  return {
    props: {
      rejected,
      isPublic,
    },
  };
}

const Confirm = () => {
  const { cartState, deleteCart } = useContext(CartContext);
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState('panel1');
  const { form, formData, updateFormData } = useFormData(null);
  const { setToastState }: any = useToast();
  const [mutationCreatePayment] = useMutation(CREATE_PAYMENT);
  const [mutationUpdateProduct] = useMutation(UPDATE_PRODUCT);

  const getTotal = (): number => {
    const total = cartState.reduce((prev, curr) => prev + curr.price, 0);
    return total;
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleOpenLoading = (val) => {
    setLoading(val);
  };

  const onSubmitForm = async () => {
    handleOpenLoading(true);
    const format = createPaymentTransformation(
      {
        ...formData,
        subtotal: getTotal(),
        total: getTotal(),
      },
      formData.email,
      cartState
    );
    await mutationCreatePayment({
      variables: { data: format },
    })
      .then(() => {
        updateStocks(format);
      })
      .catch(() => {
        setToastState({
          message: 'Hubo un error. Por favor, vuelve a intentarlo más tarde.',
          type: 'error',
        });
        handleOpenLoading(false);
      });
  };

  const updateStocks = (products) => {
    products.orders.create.orderLines.createMany.data.forEach(
      async (product) => {
        await mutationUpdateProduct({
          variables: {
            data: {
              stock: {
                decrement: product.amount,
              },
            },
            where: {
              id: product.productId,
            },
          },
        })
          .then(() => {
            setToastState({
              message: '¡Compra realizada con Éxito!',
              type: 'success',
            });
            handleOpenLoading(false);
            deleteCart();
            router.push('/');
          })
          .catch(() => {
            setToastState({
              message:
                'Hubo un error. Por favor, vuelve a intentarlo más tarde.',
              type: 'error',
            });
            handleOpenLoading(false);
          });
      }
    );
  };

  return (
    <div className='padding-screen flex flex-col sm:flex-row justify-between space-x-0 sm:space-x-4 space-y-4 sm:space-y-0 mt-4'>
      <form
        ref={form}
        onSubmit={onSubmitForm}
        onChange={updateFormData}
        className='flex flex-col sm:w-2/3 flex-1 border-2 p-4 border-border space-y-4 rounded-lg'
      >
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<i className='fas fa-chevron-down text-felico' />}
            aria-controls='panel1bh-content'
            id='panel1bh-header'
          >
            <h2 className='text-lg font-bold text-felico'>
              1. Datos Personales
            </h2>
          </AccordionSummary>
          <AccordionDetails>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 w-full'>
              <div>
                <label className='text-black font-semibold' htmlFor='product'>
                  Nombre*
                  <input
                    required
                    readOnly
                    name='name'
                    type='text'
                    className='capitalize input-form'
                    defaultValue={session?.user?.name}
                  />
                </label>
              </div>
              <div>
                <label className='text-black font-semibold' htmlFor='product'>
                  Correo electrónico*
                  <input
                    required
                    readOnly
                    name='email'
                    type='text'
                    className='input-form'
                    defaultValue={session?.user?.email}
                  />
                </label>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
        >
          <AccordionSummary
            expandIcon={<i className='fas fa-chevron-down text-felico' />}
            aria-controls='panel2bh-content'
            id='panel2bh-header'
          >
            <h2 className='text-lg font-bold text-felico'>2. Dirección</h2>
          </AccordionSummary>
          <AccordionDetails>
            <div className='flex flex-col w-full space-y-4'>
              <input
                type='text'
                placeholder='Agregar dirección'
                name='deliveryAddress'
                className='input-form'
              />
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel3'}
          onChange={handleChange('panel3')}
        >
          <AccordionSummary
            expandIcon={<i className='fas fa-chevron-down text-felico' />}
            aria-controls='panel3bh-content'
            id='panel3bh-header'
          >
            <h2 className='text-lg font-bold text-felico'>
              3. Método de envío
            </h2>
          </AccordionSummary>
          <AccordionDetails>
            <div className='flex flex-row items-center space-x-2 w-full text-xl'>
              <input
                className='h-4 w-4'
                required
                defaultChecked
                type='radio'
                name='shippingMethod'
                value='Domicilio'
              />
              <span>Domicilio</span>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel4'}
          onChange={handleChange('panel4')}
        >
          <AccordionSummary
            expandIcon={<i className='fas fa-chevron-down text-felico' />}
            aria-controls='panel4bh-content'
            id='panel4bh-header'
          >
            <h2 className='text-lg font-bold text-felico'>4. Pago</h2>
          </AccordionSummary>
          <AccordionDetails>
            <div className='flex flex-row items-center space-x-2 w-full text-xl'>
              <input
                className='h-4 w-4'
                required
                defaultChecked
                type='radio'
                name='paymentType'
                value='Efectivo'
              />
              <span>Efectivo</span>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel5'}
          onChange={handleChange('panel5')}
        >
          <AccordionSummary
            expandIcon={<i className='fas fa-chevron-down text-felico' />}
            aria-controls='panel4bh-content'
            id='panel4bh-header'
          >
            <h2 className='text-lg font-bold text-felico'>5. Notas</h2>
          </AccordionSummary>
          <AccordionDetails>
            <textarea
              name='notes'
              cols={30}
              rows={4}
              className='border border-black p-2 w-full rounded-md'
            />
          </AccordionDetails>
        </Accordion>
      </form>
      <div className='flex flex-col w-full sm:w-1/3 space-y-4 max-h-full'>
        <div className='border-2 border-border py-4 px-8 text-felico font-avenir rounded-lg'>
          <div className='flex flex-col space-y-4'>
            <h6 className='text-lg font-bold'>{`${cartState.length} artículos`}</h6>
            <div className='flex justify-between '>
              <div>Subtotal</div>
              <div>$ {new Intl.NumberFormat('de-DE').format(getTotal())}</div>
            </div>
            <div className='flex justify-between'>
              <div>Impuestos</div>
              <div>$ 0</div>
            </div>
            <div className='flex justify-between border-border border-t-2 font-bold py-2'>
              <div>Total</div>
              <div>$ {new Intl.NumberFormat('de-DE').format(getTotal())}</div>
            </div>
          </div>
          <button
            type='button'
            onClick={onSubmitForm}
            className='btn-save h-10 lg:h-12  w-full text-base break-words'
          >
            PAGAR
          </button>
        </div>
      </div>
      <Loading open={loading} />
    </div>
  );
};

export default Confirm;
