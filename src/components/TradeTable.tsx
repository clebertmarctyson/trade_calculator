"use client";

import { useState } from "react";
import { useTradeStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export const TradeTable = () => {
  const { trades, addTrade, updateTrade, removeTrade, reset, getTotalPnL } =
    useTradeStore();
  const [newTrade, setNewTrade] = useState({
    entry: 0,
    amount: 0,
    entryFee: 0,
  });

  const handleAddTrade = () => {
    if (newTrade.entry && newTrade.amount) {
      addTrade({
        entry: newTrade.entry,
        amount: newTrade.amount,
        entryFee: newTrade.entryFee,
      });
      setNewTrade({ entry: 0, amount: 0, entryFee: 0 });
    }
  };

  return (
    <div className="space-y-4 p-4">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Trades</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={handleAddTrade}
            className="flex-1 sm:flex-none"
          >
            Add Trade
          </Button>
          <Button
            variant="outline"
            onClick={reset}
            className="flex-1 sm:flex-none text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
          >
            Reset All
          </Button>
        </div>
      </div>

      {/* New Trade Input Card */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>New Trade</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Entry Price
            </label>
            <Input
              type="number"
              value={newTrade.entry}
              onChange={(e) =>
                setNewTrade((prev) => ({
                  ...prev,
                  entry: parseFloat(e.target.value),
                }))
              }
              step="0.01"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Amount</label>
            <Input
              type="number"
              value={newTrade.amount}
              onChange={(e) =>
                setNewTrade((prev) => ({
                  ...prev,
                  amount: parseFloat(e.target.value),
                }))
              }
              step="0.01"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Entry Fee</label>
            <Input
              type="number"
              value={newTrade.entryFee}
              onChange={(e) =>
                setNewTrade((prev) => ({
                  ...prev,
                  entryFee: parseFloat(e.target.value),
                }))
              }
              step="0.01"
            />
          </div>
        </CardContent>
      </Card>

      {/* Trades List */}
      <div className="space-y-4">
        {trades.map((trade) => (
          <Card
            key={trade.id}
            className={`overflow-hidden ${
              trade.completed && "border-l-2 border-l-green-500"
            }`}
          >
            <CardContent className="p-6">
              <div className="my-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    updateTrade(trade.id, {
                      completed: !trade.completed,
                    })
                  }
                >
                  {trade.completed ? "Completed ✔" : "Pending ..."}
                </Button>
              </div>

              <div className="flex justify-between items-start mb-4">
                <div className="text-sm font-medium text-muted-foreground">
                  Trade ID: {trade.id.slice(0, 8)}...
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTrade(trade.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Entry Price:</label>
                  <Input
                    type="number"
                    value={trade.entry}
                    onChange={(e) =>
                      updateTrade(trade.id, {
                        entry: parseFloat(e.target.value),
                      })
                    }
                    step="0.01"
                    className="font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Amount:</label>
                  <Input
                    type="number"
                    value={trade.amount}
                    onChange={(e) =>
                      updateTrade(trade.id, {
                        amount: parseFloat(e.target.value),
                      })
                    }
                    step="0.01"
                    className="font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Entry Fee:</label>
                  <Input
                    type="number"
                    value={trade.entryFee}
                    onChange={(e) =>
                      updateTrade(trade.id, {
                        entryFee: parseFloat(e.target.value),
                      })
                    }
                    step="0.01"
                    className="font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Net Amount:</label>
                  <div className="font-mono">${trade.netAmount.toFixed(2)}</div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Units:</label>
                  <div className="font-mono">{trade.units.toFixed(8)}</div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Exit Price:</label>
                  <Input
                    type="number"
                    value={trade.exit || ""}
                    onChange={(e) =>
                      updateTrade(trade.id, {
                        exit: parseFloat(e.target.value),
                        exitFee: trade.exitFee || 0,
                      })
                    }
                    step="0.01"
                    className="font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Exit Fee:</label>
                  <Input
                    type="number"
                    value={trade.exitFee || ""}
                    onChange={(e) =>
                      updateTrade(trade.id, {
                        exit: trade.exit || 0,
                        exitFee: parseFloat(e.target.value),
                      })
                    }
                    step="0.01"
                    className="font-mono"
                  />
                </div>
                {trade.totalAmount && (
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Total Amount:</label>
                    <div className="font-mono">
                      ${trade.totalAmount.toFixed(2)}
                    </div>
                  </div>
                )}
                {trade.netTotalAmount && (
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Net Total:</label>
                    <div className="font-mono">
                      ${trade.netTotalAmount.toFixed(2)}
                    </div>
                  </div>
                )}
                {trade.profitLoss !== undefined && (
                  <div className="space-y-1 col-span-2">
                    <label className="text-sm font-medium">Profit/Loss:</label>
                    <div
                      className={`font-mono text-lg font-bold ${
                        trade.profitLoss >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      ${trade.profitLoss.toFixed(2)}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Total P&L */}
      {trades.length > 0 && (
        <Card className="mt-6">
          <CardContent className="p-6">
            <div className="text-xl font-bold flex justify-between items-center">
              <span>Total P&L:</span>
              <span
                className={
                  getTotalPnL() >= 0 ? "text-green-500" : "text-red-500"
                }
              >
                ${getTotalPnL().toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TradeTable;
