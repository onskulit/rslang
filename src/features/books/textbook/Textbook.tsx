import { Pagination } from 'antd';
import React, { FC, useEffect, useMemo, useState } from 'react';
import {
  INITIAL_VALUE,
  PAGINATION_MAX_PAGE,
} from '../../../common/constants/numbers';
import { IWord } from '../../../common/types/interfaces';
import { apiSlice } from '../../api/apiSlice';

import styles from './Textbook.module.css';
import GroupWords from './components/groupWords/GroupWords';
import CurrentWord from './components/currentWord/CurrentWord';

interface ITextbook {
  activeGroup: number;
}

const Textbook: FC<ITextbook> = ({ activeGroup }) => {
  const [activePage, setActivePage] = useState(INITIAL_VALUE);
  const {
    data: words,
    isLoading,
    error,
  } = apiSlice.useGetWordsForPageQuery({
    group: activeGroup,
    page: activePage,
  });

  const [activeWord, setActiveWord] = useState(
    words ? words[INITIAL_VALUE] : ''
  );

  console.log(words, isLoading, error, activePage, activeGroup);

  const toggleActiveWord = (index: number): void => {
    setActiveWord((words as IWord[])[index]);
  };

  const groupWordsData = {
    activeWord: activeWord,
    words: words,
    isLoading: isLoading,
    error: error,
    toggleActiveWord: toggleActiveWord,
  };

  return (
    <section className={styles.words}>
      <GroupWords data={groupWordsData} />
      {!isLoading && (
        <>
          <CurrentWord word={(activeWord || (words as IWord[])[0]) as IWord} />
          <Pagination
            showSizeChanger={false}
            showLessItems={true}
            defaultCurrent={activePage + 1}
            total={PAGINATION_MAX_PAGE}
            current={activePage + 1}
            onChange={(page, PageSize) => {
              setActivePage(page - 1);
            }}
          />
        </>
      )}
    </section>
  );
};

export default Textbook;
