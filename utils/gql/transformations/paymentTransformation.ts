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
            data: getOrderLines(cartState),
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
