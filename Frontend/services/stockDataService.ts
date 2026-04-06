// Real-time stock data service connected to WealthLens backend
import { getApiUrl, getEndpointUrl, API_CONFIG } from '@/config/api';
import { Investment } from '@/types';

export interface StockPrice {
  symbol: string;
  name: string;
  current_price: number;
  change: number;
  change_percent: number;
  previous_close: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  market_cap: string;
  last_updated: string;
}

export interface StockDataResponse {
  success: boolean;
  data?: StockPrice;
  message?: string;
}

class StockDataService {
  private baseUrl: string;
  private cache: Map<string, { data: StockPrice; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 120000; // 2 minute cache (longer for better performance)
  private pendingRequests: Map<string, Promise<StockPrice | null>> = new Map();

  constructor() {
    this.baseUrl = getApiUrl();
    console.log('📊 Stock Data Service initialized with base URL:', this.baseUrl);
  }

  /**
   * Get real-time stock price for a symbol
   */
  async getStockPrice(symbol: string): Promise<StockPrice | null> {
    try {
      // Check cache first
      const cached = this.cache.get(symbol);
      if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
        console.log(`📋 Using cached data for ${symbol}`);
        return cached.data;
      }

      // Check if request is already pending (deduplication)
      const pendingRequest = this.pendingRequests.get(symbol);
      if (pendingRequest) {
        console.log(`⏳ Request already pending for ${symbol}`);
        return await pendingRequest;
      }

      console.log(`🔄 Fetching real-time data for ${symbol}`);

      // Create and store the pending request
      const requestPromise = this.fetchStockData(symbol);
      this.pendingRequests.set(symbol, requestPromise);

      try {
        const result = await requestPromise;
        return result;
      } finally {
        this.pendingRequests.delete(symbol);
      }
    } catch (error) {
      console.error(`❌ Error fetching stock price for ${symbol}:`, error);
      return null;
    }
  }

  private async fetchStockData(symbol: string): Promise<StockPrice | null> {
    try {
      const response = await fetch(`${this.baseUrl}/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: `What is the current price of ${symbol} stock?`,
          deep_search: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch stock data: ${response.status}`);
      }

      const data = await response.json();
      
      // Parse the response to extract stock data
      const stockData = this.parseStockResponse(data, symbol);
      
      if (stockData) {
        // Cache the result
        this.cache.set(symbol, { data: stockData, timestamp: Date.now() });
        return stockData;
      }

      return null;
    } catch (error) {
      console.error(`Error fetching stock price for ${symbol}:`, error);
      return null;
    }
  }

  /**
   * Get multiple stock prices at once
   */
  async getMultipleStockPrices(symbols: string[]): Promise<Map<string, StockPrice>> {
    const results = new Map<string, StockPrice>();
    
    // Process stocks in parallel with a limit to avoid overwhelming the backend
    const batchSize = 3;
    for (let i = 0; i < symbols.length; i += batchSize) {
      const batch = symbols.slice(i, i + batchSize);
      const promises = batch.map(symbol => this.getStockPrice(symbol));
      const batchResults = await Promise.all(promises);
      
      batch.forEach((symbol, index) => {
        const result = batchResults[index];
        if (result) {
          results.set(symbol, result);
        }
      });
      
      // Small delay between batches to be respectful to the API
      if (i + batchSize < symbols.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    return results;
  }

  /**
   * Parse the backend response to extract stock data
   */
  private parseStockResponse(response: any, symbol: string): StockPrice | null {
    try {
      let content: string | undefined = undefined;
      
      // Extract the answer content safely from various backend shapes
      const ans = response?.answer;
      if (ans && typeof ans === 'object') {
        if (typeof (ans as any).answer === 'string' && (ans as any).answer.trim()) {
          content = (ans as any).answer;
        } else if (typeof (ans as any).content === 'string' && (ans as any).content.trim()) {
          content = (ans as any).content;
        } else if (typeof (ans as any).text === 'string' && (ans as any).text.trim()) {
          content = (ans as any).text;
        }
      } else if (typeof ans === 'string' && ans.trim()) {
        content = ans;
      }

      if (typeof content !== 'string' || !content) {
        return null;
      }

      // Parse the markdown/plaintext response to extract stock data (supports ₹ or $)
      const priceMatch = content.match(/(Current Price|Price).*?[₹$]?\s*([\d,]+\.?\d*)/i);
      const changeMatch = content.match(/Change.*?[₹$]?\s*([+-]?[\d,]+\.?\d*)\s*\(([+-]?[\d.]+)%\)/i);
      const previousCloseMatch = content.match(/Previous Close.*?[₹$]?\s*([\d,]+\.?\d*)/i);
      const volumeMatch = content.match(/Volume.*?([\d,]+)/i);
      
      if (!priceMatch) {
        console.warn('Could not parse stock price from response:', content);
        return null;
      }

      const currentPrice = parseFloat(priceMatch[1].replace(/,/g, ''));
      const change = changeMatch ? parseFloat(changeMatch[1].replace(/,/g, '')) : 0;
      const changePercent = changeMatch ? parseFloat(changeMatch[2]) : 0;
      const previousClose = previousCloseMatch ? parseFloat(previousCloseMatch[1].replace(/,/g, '')) : currentPrice - change;
      const volume = volumeMatch ? parseInt(volumeMatch[1].replace(/,/g, '')) : 0;

      return {
        symbol: symbol.toUpperCase(),
        name: this.getCompanyName(symbol),
        current_price: currentPrice,
        change: change,
        change_percent: changePercent,
        previous_close: previousClose,
        open: previousClose, // Approximation
        high: currentPrice + Math.abs(change), // Approximation
        low: currentPrice - Math.abs(change), // Approximation
        volume: volume,
        market_cap: 'N/A',
        last_updated: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error parsing stock response:', error);
      return null;
    }
  }

  /**
   * Get company name from symbol
   */
  private getCompanyName(symbol: string): string {
    const companyNames: { [key: string]: string } = {
      'AAPL': 'Apple Inc.',
      'GOOGL': 'Alphabet Inc.',
      'MSFT': 'Microsoft Corporation',
      'AMZN': 'Amazon.com Inc.',
      'TSLA': 'Tesla Inc.',
      'META': 'Meta Platforms Inc.',
      'NVDA': 'NVIDIA Corporation',
      'NFLX': 'Netflix Inc.',
      'UBER': 'Uber Technologies Inc.',
      'SPOT': 'Spotify Technology S.A.',
      'RELIANCE': 'Reliance Industries Ltd.',
      'TCS': 'Tata Consultancy Services Ltd.',
      'INFY': 'Infosys Ltd.',
      'HDFC': 'HDFC Bank Ltd.',
      'ICICI': 'ICICI Bank Ltd.',
      'SBI': 'State Bank of India',
    };
    
    return companyNames[symbol.toUpperCase()] || `${symbol.toUpperCase()} Corp.`;
  }

  /**
   * Update investment data with real-time prices
   */
  async updateInvestmentWithRealData(investment: Investment): Promise<Investment> {
    const stockData = await this.getStockPrice(investment.ticker);
    
    if (!stockData) {
      console.warn(`Could not fetch real data for ${investment.ticker}, using existing data`);
      return investment;
    }

    // Convert INR to USD (approximate conversion for display)
    const usdPrice = stockData.current_price * 0.012; // Rough conversion rate
    
    return {
      ...investment,
      price: usdPrice,
      change: stockData.change * 0.012,
      changePercent: stockData.change_percent,
      currentValue: usdPrice * investment.quantity,
      // Keep original purchase value
    };
  }

  /**
   * Clear cache (useful for forcing fresh data)
   */
  clearCache(): void {
    this.cache.clear();
    console.log('Stock data cache cleared');
  }

  /**
   * Get live investment opportunities
   */
  async getLiveOpportunities(limit: number = 10): Promise<StockPrice[]> {
    try {
      console.log(`Fetching ${limit} live investment opportunities`);

      const response = await fetch(`${this.baseUrl}/live-opportunities?limit=${limit}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch opportunities: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.data) {
        return data.data.map((stock: any) => this.formatStockData(stock));
      }

      return [];
    } catch (error) {
      console.error('Error fetching live opportunities:', error);
      return [];
    }
  }

  /**
   * Get market movers (gainers and losers)
   */
  async getMarketMovers(): Promise<{ gainers: StockPrice[]; losers: StockPrice[] }> {
    try {
      console.log('Fetching market movers');

      const response = await fetch(`${this.baseUrl}/market-movers`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch market movers: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.data) {
        return {
          gainers: data.data.gainers?.map((stock: any) => this.formatStockData(stock)) || [],
          losers: data.data.losers?.map((stock: any) => this.formatStockData(stock)) || [],
        };
      }

      return { gainers: [], losers: [] };
    } catch (error) {
      console.error('Error fetching market movers:', error);
      return { gainers: [], losers: [] };
    }
  }

  /**
   * Search for stocks
   */
  async searchStocks(query: string, limit: number = 10): Promise<StockPrice[]> {
    try {
      console.log(`Searching stocks for: ${query}`);

      const response = await fetch(`${this.baseUrl}/search-stocks?q=${encodeURIComponent(query)}&limit=${limit}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to search stocks: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.data) {
        return data.data.map((stock: any) => this.formatStockData(stock));
      }

      return [];
    } catch (error) {
      console.error('Error searching stocks:', error);
      return [];
    }
  }

  /**
   * Format stock data from backend response
   */
  private formatStockData(stock: any): StockPrice {
    return {
      symbol: stock.symbol,
      name: stock.name,
      current_price: stock.current_price,
      change: stock.change,
      change_percent: stock.change_percent,
      previous_close: stock.previous_close,
      open: stock.day_low || stock.current_price,
      high: stock.day_high || stock.current_price,
      low: stock.day_low || stock.current_price,
      volume: stock.volume || 0,
      market_cap: stock.market_cap?.toString() || 'N/A',
      last_updated: stock.last_updated,
    };
  }

  /**
   * Test connection to stock data service
   */
  async testConnection(): Promise<boolean> {
    try {
      const testStock = await this.getStockPrice('AAPL');
      return testStock !== null;
    } catch (error) {
      console.error('Stock data service connection test failed:', error);
      return false;
    }
  }
}

export const stockDataService = new StockDataService();
