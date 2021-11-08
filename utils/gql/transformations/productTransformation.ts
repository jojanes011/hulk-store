export const createProductTransformation = (formData: any) => {
  const format = {
    name: formData?.name,
    description: formData?.description,
    stock: parseFloat(formData?.stock),
    price: parseFloat(formData?.price),
    imagePath: formData?.imagePath,
    category: {
      connectOrCreate: {
        create: {
          name: formData?.categoryName,
        },
        where: {
          id: formData?.categoryId,
        },
      },
    },
  };
  return format;
};

export const updateProductTransformation = (formData: any) => {
  const format = {
    name: {
      set: formData?.name,
    },
    description: {
      set: formData?.description,
    },
    stock: {
      set: parseFloat(formData?.stock),
    },
    price: {
      set: parseFloat(formData?.price),
    },
    imagePath: {
      set: formData?.imagePath,
    },
    category: {
      connectOrCreate: {
        create: {
          name: formData?.categoryName,
        },
        where: {
          id: formData?.categoryId,
        },
      },
    },
  };
  return format;
};
