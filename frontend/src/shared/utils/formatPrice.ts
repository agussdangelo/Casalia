export const formatPrice = (price: number) => `$ ${new Intl.NumberFormat("es-AR").format(price)}`;
