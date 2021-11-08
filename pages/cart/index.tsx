import CardResumeProduct from '@components/cards/CardResumeProduct';
import { CartContext } from 'context/cart';
import { useRouter } from 'next/router';
import { useContext, useMemo, useState } from 'react';
import matchRoles from 'utils/matchRoles';

export async function getServerSideProps(context) {
  const { rejected, isPublic } = await matchRoles(context);
  return {
    props: { rejected, isPublic },
  };
}
const Cart = () => {
  const { cartState, addToCart, removeFromCart, removeAllFromCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const getTotal = (): number => {
    const total = cartState.reduce((prev, curr) => prev + curr.price, 0);
    return total;
  };

  const getQuantityProduct = () => {
    const formatProducts = [];
    cartState.forEach((product) => {
      const indexExist = formatProducts.findIndex(
        (formatProduct) => formatProduct.id === product.id
      );
      if (indexExist !== -1) {
        const { price } = cartState.find((cart) => cart.id === product.id);
        formatProducts[indexExist] = {
          ...formatProducts[indexExist],
          price,
          quantity: formatProducts[indexExist].quantity + 1,
        };
      } else {
        formatProducts.push({ ...product, quantity: 1 });
      }
    });
    setProducts(formatProducts);
  };

  useMemo(() => getQuantityProduct(), [cartState]);
  return (
    <div className='flex flex-col padding-screen space-y-4 mt-4'>
      <h1 className='text-2xl font-bold'>Carrito</h1>
      <div className='flex flex-col space-x-0 space-y-4 md:space-y-0 md:flex-row md:space-x-8'>
        <div className='flex flex-col sm:w-3/4 flex-1 border p-4 border-black space-y-4 rounded-md'>
          {products.length > 0 ? (
            products
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((product) => (
                <CardResumeProduct
                  product={product}
                  cart={cartState}
                  key={product.id}
                  add={addToCart}
                  remove={removeFromCart}
                  removeAll={removeAllFromCart}
                />
              ))
          ) : (
            <div className='flex flex-col w-full text-center text-primary font-bold text-2xl h-full place-content-center'>
              <h1>El carrito de compras está vacío</h1>
            </div>
          )}
        </div>
        <div className='flex flex-col w-full sm:w-1/4 space-y-4'>
          <div className='text-center border border-black py-4 px-8 rounded-md'>
            <div className='flex flex-col space-y-4'>
              <h6 className='font-bold '>Resumen del Pago</h6>
              <div className='flex justify-between '>
                <div>Subtotal</div>
                <div>$ {new Intl.NumberFormat('de-DE').format(getTotal())}</div>
              </div>
              <div className='flex justify-between'>
                <div>Iva</div>
                <div>$ 0</div>
              </div>
              <div className='flex justify-between border-black border-t font-bold py-2'>
                <div>Total</div>
                <div>$ {new Intl.NumberFormat('de-DE').format(getTotal())}</div>
              </div>
            </div>
            <button
              type='button'
              className='btn-save text-sm uppercase'
              onClick={() => {
                router.push('/cart/confirm');
              }}
              disabled={products.length === 0}
            >
              finalizar pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
