import styles from './Loader.module.scss';
import React, { FC } from 'react';
import cn from 'classnames';

interface Props {
  className?: string;
}

const Loader: FC<Props> = ({className}: Props) => (
  <div className={cn(styles.Loader, className)}>
    <div/>
    <div/>
  </div>
);

export default Loader;
