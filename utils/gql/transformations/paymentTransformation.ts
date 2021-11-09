const getOrderLines = (orders = []) => {
  const format = [];
  orders.forEach((order) => {
    format.push({
      amount: order?.quantity ?? 1,
      productId: order?.id,
      comments: '',
    });
  });
  return format;
};

const getQuantityProduct = (cartState) => {
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
  return getOrderLines(formatProducts);
};

const createPaymentTransformation = (
  formData: any,
  userId: any,
  cartState: any
) => {
  const format = {
    paymentType: formData?.paymentType,
    subtotal: formData?.subtotal,
    tax: 0,
    total: formData?.total,
    orders: {
      create: {
        deliveryDate: new Date(),
        delivered: false,
        deliveryAddress: formData?.deliveryAddress,
        notes: formData?.notes,
        orderLines: {
          createMany: {
            data: getQuantityProduct(cartState),
          },
        },
        user: {
          connect: {
            email: userId,
          },
        },
      },
    },
  };
  return format;
};

export default createPaymentTransformation;
