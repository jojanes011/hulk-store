import React from 'react';

const Footer = () => (
  <div className='flex flex-col space-y-2 md:space-y-0 md:flex-row justify-around items-center border-t p-2 mt-8'>
    <div>
      <p className='font-bold text-center text-xs text-black'>
        © Hulk Store 2021 - Derechos reservados.
      </p>
    </div>
    <div className='flex flex-row space-x-4 justify-between'>
      <i className='text-4xl fab fa-cc-mastercard text-gray-900' />
      <i className='text-4xl fab fa-cc-visa text-blue-800' />
      <i className='text-4xl fab fa-cc-amex text-gray-900' />
    </div>
    <div className='flex flex-row space-x-4 items-center'>
      <span className='text-sm font-light'>Conectémonos:</span>
      <a
        href='https://whatsapp.com'
        className='font-bold text-lg  hover:text-gray-600'
        aria-label='Whatsapp'
        target='_blank'
        rel='noreferrer'
      >
        <i className='text-2xl fab fa-whatsapp text-green-600' />
      </a>
      <a
        href='https://www.facebook.com'
        className='font-bold text-lg   hover:text-gray-600'
        target='_blank'
        aria-label='facebook'
        rel='noreferrer'
      >
        <i className='text-2xl fab fa-facebook text-blue-800' />
      </a>
      <a
        href='https://www.instagram.com'
        className='font-bold text-lg   hover:text-gray-600'
        target='_blank'
        aria-label='Insta'
        rel='noreferrer'
      >
        <i className='text-2xl fab fa-instagram text-pink-600' />
      </a>
    </div>
  </div>
);

export default Footer;
