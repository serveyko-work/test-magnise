import { http } from '../http/http';
import { formatDate } from '../helpers/helpers';
import { ISelectValue } from '../types/select';

export const getAssets = async () => {
  const assets = await http.get('/assets');

  return assets?.data;
}

interface IExchangerateItem {
  time_close: string,
  rate_close: string
}

interface IExchangerate {
  data: Array<IExchangerateItem>
}

export const getExchangerate = async (currentValue: ISelectValue) => {
  const {data}: IExchangerate = await http.get(`/exchangerate/${currentValue['asset_id']}/USD/history?period_id=10DAY&time_start=${currentValue['data_start']}&time_end=${currentValue['data_end']}&limit=100000`)

  return ({
    labels: data.map((crypto: IExchangerateItem) => formatDate(crypto.time_close)),
    datasets: [
      {
        label: "Price in USD",
        data: data.map((crypto: IExchangerateItem) => crypto.rate_close),
        backgroundColor: ['#3d5dff']
      }
    ]
  });
}