import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import styles from './Select.module.scss';
import cn from 'classnames';
import Arrow from '../Icons/Arrow';
import { ISelectValue } from '../../../types/select';

interface Props {
  options: Array<ISelectValue>,
  name: string,
  selectParam: string,
  className?: string,
  setCurrentValue: (value: ISelectValue) => void
}

const Select: FC<Props> = ({options, name, className, selectParam, setCurrentValue}): JSX.Element => {

  const [isShow, setIsShow] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const selectRef = useRef<HTMLDivElement | null>(null);
  const changeShow = (): void => {
    setIsShow(prevState => !prevState)
  }

  const closeSelect = (): void => {
    setIsShow(false)
  }

  useEffect(() => {
    const handleMouseClick = (e: MouseEvent | Event): void => {
      // @ts-ignore
      if (!e.path?.includes(selectRef?.current)) {
        closeSelect();
      }
    }

    window.addEventListener('click', handleMouseClick);
    window.addEventListener('scroll', closeSelect);
    window.addEventListener('resize', closeSelect, true);
    return () => {
      window.removeEventListener('click', handleMouseClick);
      window.removeEventListener('scroll', closeSelect);
      window.removeEventListener('resize', closeSelect, true);
    }
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e?.target?.value);
    setIsShow(true);
  }

  const setSelectValue = (option: any): void => {
    setValue(option[selectParam]);
    setCurrentValue(option);
  }

  const getOption = (option: any, index: number) => {
    if (option[selectParam]?.toLowerCase()?.startsWith(value?.toLowerCase())) {
      return (
        <span
          onClick={() => setSelectValue(option)}
          className={styles.option}
          key={`${option[selectParam]}_${index}`}>
          {option[selectParam]}
        </span>
      )
    }
    return null;
  }

  return (
    <div onClick={changeShow} ref={selectRef} className={cn(styles.select, className)}>
      <input value={value} placeholder={name} onChange={handleChange}/>
      <Arrow/>
      <div className={cn(styles.options, {[styles.show]: isShow})}>
        {options.map((option: ISelectValue, index: number) => getOption(option, index))}
      </div>
    </div>
  );
};

export default Select;
