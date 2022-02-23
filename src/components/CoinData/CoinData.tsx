import React, { FC } from 'react';
import styles from './CoinData.module.scss';

interface Props {
  name?: string | undefined,
  lastUpdate: string | number | Date,
  value: string | number,
}

const CoinData: FC<Props> = ({name, lastUpdate, value}): JSX.Element => {
  return (
    <div className={styles.coinData}>
      <div className={styles.column}>
        <p>Name</p>
        <p>{name}</p>
      </div>
      <div className={styles.column}>
        <p>Value</p>
        <p>{value}</p>
      </div>
      <div className={styles.column}>
        <p>Last Update</p>
        <p>{lastUpdate}</p>
      </div>
    </div>
  );
};

export default CoinData;