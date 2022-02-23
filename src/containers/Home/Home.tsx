import React, { FC, useEffect, useState } from 'react';
import Select from '../../components/UI/Select/Select';
import Chart from '../../components/Chart/Chart';
import { formatDate } from '../../helpers/helpers';
import CoinData from '../../components/CoinData/CoinData';
import Loader from '../../components/Loader/Loader';
import { getAssets, getExchangerate } from '../../services/coinApi';
import { IChartData } from '../../types/chart';
import { ISelectValue } from '../../types/select';

interface ICoinData {
  price: number,
  date: string | Date
}

const socket = new WebSocket('ws://ws.coinapi.io/v1/');

const Home: FC = (): JSX.Element => {
  const [chartData, setChartData] = useState<IChartData>({});
  const [selectData, setSelectData] = useState<Array<ISelectValue>>([]);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [isLoadList, setIsLoadList] = useState<boolean>(false);
  const [coinData, setCoinData] = useState<ICoinData>({price: 0.00, date: ''});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<ISelectValue | null>(null);

  useEffect(() => {
    setIsLoadList(false);
    socket.onopen = (): void => {
      setIsOpen(true);
    };

    const setAssets = async (): Promise<void> => {
      setSelectData(await getAssets())
    }

    setAssets().then(() => {
      setIsLoadList(true)
    });

    return () => {
      socket.close()
    }
  }, []);

  useEffect(() => {
    setCoinData({
      price: 0,
      date: formatDate(new Date(), true)
    });
    const openSocket = (): void => {
      if (isOpen && currentValue) {
        const obj = {
          "type": "hello",
          "apikey": process.env.REACT_APP_API_KEY || '',
          "heartbeat": false,
          "subscribe_data_type": [
            "trade"
          ],
          "subscribe_filter_symbol_id": [
            `BINANCE_SPOT_${currentValue['asset_id']}_USDT`,
          ]
        }

        socket.send(JSON.stringify(obj));
        socket.onmessage = (msg: MessageEvent): void => {
          let data = JSON.parse(msg.data);
          console.log(data)
          if (data.price !== coinData?.price) {
            setCoinData({
              price: data.price,
              date: formatDate(new Date(), true)
            });
          }
        }
      }
    }

    const getData = async (): Promise<void> => {
      if (currentValue) {
        setIsLoad(false);
        const chartData = await getExchangerate(currentValue);
        setChartData(chartData);
        openSocket();
      }
    }
    getData().then(() => setIsLoad(true));
  }, [currentValue])

  return (
    <div>
      {isLoadList ? <Select setCurrentValue={setCurrentValue} options={selectData} selectParam={'asset_id'} name={'coin'}/> : <Loader/>}
      {(isLoad || currentValue === null) ?
        <>
          <CoinData name={currentValue?.name} lastUpdate={coinData?.date || ''} value={coinData?.price || ''}/>
          {Object.keys(chartData)?.length ? <Chart chartData={chartData}/> : null}
        </> : <Loader/>
      }
    </div>
  );
};

export default Home;