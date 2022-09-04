import { Pagination } from 'antd';
import React, { FC, useEffect, useMemo, useState } from 'react';
import {
  INITIAL_VALUE,
  PAGINATION_MAX_PAGE,
} from '../../../common/constants/numbers';
import { IWord } from '../../../common/types/interfaces';
import { apiSlice } from '../../api/apiSlice';

import styles from './Textbook.module.css';
import CurrentWord from '../components/currentWord/CurrentWord';
import GroupWords from '../components/groupWords/GroupWords';
import { useAppSelector } from '../../../app/hooks';
import { storage } from '../../../common/utils/localStorage';
import { STORAGE_KEY } from '../../../common/constants/localStorage';
import {
  IUserAggregatedWordData,
  IUserAggregatedWordsArray,
  IUserAggregatedWordsData,
  useGetAggregatedWordsQuery,
} from '../../../app/services/UserService';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { SerializedError } from '@reduxjs/toolkit';

interface ITextbook {
  activeGroup: number;
}

interface INeedWords {
  storageData: string;
  activePage: number;
  activeGroup: number;
}

interface ICheckNeedWords {
  data: IWord[] | IUserAggregatedWordsArray | undefined;
  isLoading: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
}

const checkNeedWords = (props: INeedWords): ICheckNeedWords => {
  if (props.storageData) {
    const { data, isLoading, error } = useGetAggregatedWordsQuery({
      filter: JSON.stringify({ page: props.activePage }),
      group: props.activeGroup,
      wordsPerPage: 20,
    });

    return {
      data,
      isLoading,
      error,
    };
  }
  const { data, isLoading, error } = apiSlice.useGetWordsForPageQuery({
    group: props.activeGroup,
    page: props.activePage,
  });
  return { data, isLoading, error };
};

const Textbook: FC<ITextbook> = ({ activeGroup }) => {
  const storageData = storage.get(STORAGE_KEY.userAuthData);
  const [activePage, setActivePage] = useState(INITIAL_VALUE);
  const {
    data: words,
    isLoading,
    error,
  } = checkNeedWords({ storageData, activePage, activeGroup });

  const isStorageData = !!storageData;

  const checkNeedWord = (index: number): IWord | IUserAggregatedWordData => {
    return isStorageData
      ? (words as IUserAggregatedWordsArray)[0].paginatedResults[index]
      : (words as IWord[])[index];
  };

  const [activeWord, setActiveWord] = useState(
    words ? checkNeedWord(INITIAL_VALUE) : ''
  );

  const currentWord = (): IWord | IUserAggregatedWordData => {
    return isStorageData
      ? (words as IUserAggregatedWordsArray)[0].paginatedResults[0]
      : ((words as IWord[])[0] as IWord);
  };

  const toggleActiveWord = (index: number): void => {
    const needWord = checkNeedWord(index);
    setActiveWord(needWord);
  };

  const groupWordsData = {
    activeWord: activeWord,
    words: words,
    isLoading: isLoading,
    error: error,
    toggleActiveWord: toggleActiveWord,
  };

  return (
    <>
      {words && (
        <section className={styles.words}>
          <GroupWords
            groupWordsData={groupWordsData}
            isStorageData={isStorageData}
          />
          {!isLoading && (
            <>
              <CurrentWord
                word={activeWord || currentWord()}
                isStorageData={isStorageData}
              />
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
      )}
    </>

    // <div>fdg</div>
  );
};

export default Textbook;
