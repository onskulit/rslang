import { Pagination } from 'antd';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { INITIAL_VALUE } from '../../../common/constants/numbers';
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
  const pageСount = 300;
  const {
    data: words,
    isLoading,
    error,
  } = apiSlice.useGetWordsForPageQuery({
    group: activeGroup,
    page: activePage,
  });

  // TODO первое отображение, воспроизведение звука
  const [activeWord, setActiveWord] = useState(words ? words[1] : '');

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
      <CurrentWord word={activeWord as IWord} />
      <Pagination
        showSizeChanger={false}
        showLessItems={true}
        defaultCurrent={activePage + 1}
        total={pageСount}
        current={activePage + 1}
        onChange={(page, PageSize) => {
          setActivePage(page - 1);
        }}
      />
    </section>
  );
};

export default Textbook;
