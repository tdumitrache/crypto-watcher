export interface ITrendyCoin {
  item: {
    id: string;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    score: number;
  };
}

export interface IGlobalMarketData {
  active_cryptocurrencies: number;
  total_market_cap: any;
  total_volume: any;
  markets: number;
  ended_icos: number;
  market_cap_percentage: {
    btc: number;
    eth: number;
  };
  market_cap_change_percentage_24h_usd: number;
}
