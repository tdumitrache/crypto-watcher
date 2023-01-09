export interface ICoinData {
  id: string;
  symbol: string;
  name: string;
  description: { en: string };
  links: {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    subreddit_url: string;
    repos_url: {
      github: string[];
      bitbucket: string[];
    };
  };
  hashing_algorithm: string;
  image: {
    small: string;
  };
  community_data: {
    twitter_followers: number;
  };
  market_cap_rank: number;

  market_data: {
    circulating_supply: number;
    fully_diluted_valuation: {
      usd: number;
    };
    market_cap: {
      usd: number;
    };
    current_price: {
      usd: number;
      eth: number;
    };
    price_change_24h: number;
    price_change_percentage_24h: number;
    price_change_percentage_7d: number;
    price_change_percentage_14d: number;
    price_change_percentage_30d: number;
    price_change_percentage_60d: number;
    price_change_percentage_200d: number;
    price_change_percentage_1y: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    price_change_24h_in_currency: {
      usd: number;
      eth: number;
    };
    price_change_percentage_1h_in_currency: {
      usd: number;
    };
    price_change_percentage_24h_in_currency: {
      usd: number;
    };
    price_change_percentage_7d_in_currency: {
      usd: number;
    };
    price_change_percentage_14d_in_currency: {
      usd: number;
    };
    price_change_percentage_30d_in_currency: {
      usd: number;
    };
    price_change_percentage_1y_in_currency: {
      usd: number;
    };
    high_24h: {
      usd: number;
    };
    low_24h: {
      usd: number;
    };
    total_volume: {
      usd: number;
    };
    max_supply: number;
  };
  market_cap: number;

  total_supply: number;
}

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

export interface ICryptocurrency {
  id: string;
  symbol: string;
  name: string;
  market_cap_rank: number;
  image: string;
  current_price: number;
  price_change_percentage_1h_in_currency?: number;
  price_change_percentage_24h_in_currency?: number;
  price_change_percentage_7d_in_currency?: number;
  market_cap?: number;
  total_volume?: number;
  max_supply?: number;
  circulating_supply?: number;
  sparkline_in_7d: { price?: number[] };
}

export interface IGlobalMarketData {
  active_cryptocurrencies: number;
  total_market_cap: {
    usd: number;
  };
  total_volume: any;
  markets: number;
  ended_icos: number;
  market_cap_percentage: {
    btc: number;
    eth: number;
  };
  market_cap_change_percentage_24h_usd: number;
}

export type IDaysInterval = '1' | '14' | '30' | 'max';
