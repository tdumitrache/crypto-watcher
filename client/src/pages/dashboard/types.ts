export interface ICryptoNew {
  title: string;
  url: string;
  imgurl: string;
}

export interface ICryptocurrency {
  id: string;
  symbol: string;
  name: string;
  market_cap_rank: number;
  image: string;
  current_price: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  market_cap: number;
  total_volume: number;
  max_supply: number;
  circulating_supply: number;
  sparkline_in_7d?: { price: number[] };
}
