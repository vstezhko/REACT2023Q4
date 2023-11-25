import React from 'react';
import SearchBlock from './SearchBlock';
import ErrorBtn from './ErrorBtn';
import { wrapper } from '@/redux/store';
import { useRouter } from 'next/router';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    console.log('context!!!!!!!!!!', context);
    const storeQuery = store.getState().query;

    return {
      props: {
        query: storeQuery,
      },
    };
  }
);

const Header = ({ query }) => {
  const router = useRouter();
  console.log(query);

  const handleSearchValueChange = async (newValue: string) => {
    router.push(
      `${
        query.id ? `${query.id}` : ''
      }?searchValue=${newValue}&page=1&pageSize=${Number(
        query?.pageSize || 10
      )}`
    );
  };

  return (
    <header className="header">
      <div className="logo">
        <img className="logo__img" src="/harry.svg" alt="logo" />
        <h2 className="logo__title">HARRY POTTER</h2>
      </div>
      <SearchBlock
        searchValue={query?.searchValue || ''}
        handleSearchValueChange={handleSearchValueChange}
      />
      <ErrorBtn />
    </header>
  );
};

export default Header;
