interface CategoriesInterface {
  categories: Array<any>;
  onFilter: any;
}

const Categories = ({
  categories = [],
  onFilter = () => {},
}: CategoriesInterface) => (
  <>
    <div className='hidden md:flex flex-row items-center'>
      <div className='flex flex-row'>
        <button
          type='button'
          onClick={() => onFilter('Todas')}
          className='text-primary'
        >
          Todas
        </button>
        <span className='mx-2'>|</span>
      </div>
      {categories.map((category) => (
        <div className='flex flex-row' key={category?.id}>
          <button
            type='button'
            onClick={() => onFilter(category?.name)}
            className='font-light'
          >
            {category?.name}
          </button>
          <span className='mx-2'>|</span>
        </div>
      ))}
    </div>
    <div className='flex md:hidden'>
      <select
        onChange={(event) => onFilter(event.target.value)}
        name='select'
        defaultValue='Todas'
        className='py-2 px-4 border border-black'
      >
        <option value='Todas'>Todas</option>
        {categories.map((category) => (
          <option key={category?.id} value={category?.name}>
            {category?.name}
          </option>
        ))}
      </select>
    </div>
  </>
);

export default Categories;
