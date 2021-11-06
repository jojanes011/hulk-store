interface CardPromotionInterface {
  title: string;
  description: string;
  classNameCard?: string;
  classNameButton?: string;
}

const CardPromotion = ({
  title = '',
  description = '',
  classNameCard = '',
  classNameButton = '',
}: CardPromotionInterface) => (
  <div
    className={`${classNameCard} flex flex-col justify-between space-y-8 p-10 rounded-md shadow-xl`}
  >
    <div className='w-1/2 break-words font-extrabold text-2xl'>
      <h2>{title}</h2>
    </div>
    <div className='w-1/2 break-words'>
      <h3>{description}</h3>
    </div>
    <div>
      <button
        type='button'
        className={`${classNameButton} p-2 font-bold rounded-md`}
      >
        Comprar Ahora
      </button>
    </div>
  </div>
);

export default CardPromotion;
