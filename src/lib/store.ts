import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Trade {
  id: string;
  entry: number;
  amount: number;
  entryFee: number;
  netAmount: number;
  units: number;
  exit?: number;
  exitFee?: number;
  totalAmount?: number;
  netTotalAmount?: number;
  profitLoss?: number;
  completed?: boolean;
}

interface TradeState {
  trades: Trade[];
  addTrade: (trade: Omit<Trade, "id" | "netAmount" | "units">) => void;
  updateTrade: (id: string, trade: Partial<Trade>) => void;
  removeTrade: (id: string) => void;
  reset: () => void;
  getTotalPnL: () => number;
}

const calculateUnits = (
  amount: number,
  entryFee: number,
  entry: number
): number => {
  const netAmount = Number((amount - entryFee).toFixed(8));
  return Number((netAmount / entry).toFixed(8));
};

export const useTradeStore = create(
  persist<TradeState>(
    (set, get) => ({
      trades: [],

      addTrade: (tradeData) =>
        set((state) => {
          const netAmount = Number(
            (tradeData.amount - tradeData.entryFee).toFixed(8)
          );
          const units = calculateUnits(
            tradeData.amount,
            tradeData.entryFee,
            tradeData.entry
          );

          const newTrade: Trade = {
            id: crypto.randomUUID(),
            ...tradeData,
            netAmount,
            units,
            completed: false,
          };

          return { trades: [...state.trades, newTrade] };
        }),

      updateTrade: (id, updates) =>
        set((state) => {
          return {
            trades: state.trades.map((trade) => {
              if (trade.id !== id) return trade;

              const updatedTrade = { ...trade, ...updates };

              // Recalculate values
              updatedTrade.netAmount = Number(
                (updatedTrade.amount - updatedTrade.entryFee).toFixed(8)
              );
              updatedTrade.units = calculateUnits(
                updatedTrade.amount,
                updatedTrade.entryFee,
                updatedTrade.entry
              );

              if (updatedTrade.exit && updatedTrade.exitFee !== undefined) {
                updatedTrade.totalAmount =
                  updatedTrade.units * updatedTrade.exit;
                updatedTrade.netTotalAmount =
                  updatedTrade.totalAmount - updatedTrade.exitFee;
                updatedTrade.profitLoss =
                  updatedTrade.netTotalAmount - updatedTrade.amount;
              }

              return updatedTrade;
            }),
          };
        }),

      removeTrade: (id) =>
        set((state) => ({
          trades: state.trades.filter((trade) => trade.id !== id),
        })),

      reset: () => set({ trades: [] }),

      getTotalPnL: () => {
        const { trades } = get();
        return trades.reduce((sum, trade) => sum + (trade.profitLoss || 0), 0);
      },
    }),
    {
      name: "trade-storage",
    }
  )
);
