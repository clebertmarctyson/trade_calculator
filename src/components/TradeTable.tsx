import { useState } from "react";
import { useTradeStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

  const handleUpdateExit = (id: string, exit: number, exitFee: number) => {
    updateTrade(id, { exit, exitFee });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Trades</h2>
        <div className="flex gap-4">
          <Button variant="outline" onClick={handleAddTrade}>
            Add Trade
          </Button>
          <Button
            variant="outline"
            onClick={reset}
            className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
          >
            Reset All
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Entry</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Entry Fee</TableHead>
            <TableHead>Net Amount</TableHead>
            <TableHead>Units</TableHead>
            <TableHead>Exit</TableHead>
            <TableHead>Exit Fee</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Net Total Amount</TableHead>
            <TableHead>Profit/Loss</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
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
                className="w-24"
              />
            </TableCell>
            <TableCell>
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
                className="w-24"
              />
            </TableCell>
            <TableCell>
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
                className="w-24"
              />
            </TableCell>
            <TableCell colSpan={8}></TableCell>
          </TableRow>
          {trades.map((trade) => (
            <TableRow key={trade.id}>
              <TableCell>{trade.entry.toFixed(2)}</TableCell>
              <TableCell>{trade.amount.toFixed(2)}</TableCell>
              <TableCell>{trade.entryFee.toFixed(2)}</TableCell>
              <TableCell>{trade.netAmount.toFixed(2)}</TableCell>
              <TableCell>{trade.units.toFixed(8)}</TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={trade.exit || ""}
                  onChange={(e) =>
                    handleUpdateExit(
                      trade.id,
                      parseFloat(e.target.value),
                      trade.exitFee || 0
                    )
                  }
                  step="0.01"
                  className="w-24"
                />
              </TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={trade.exitFee || ""}
                  onChange={(e) =>
                    handleUpdateExit(
                      trade.id,
                      trade.exit || 0,
                      parseFloat(e.target.value)
                    )
                  }
                  step="0.01"
                  className="w-24"
                />
              </TableCell>
              <TableCell>{trade.totalAmount?.toFixed(2) || "-"}</TableCell>
              <TableCell>{trade.netTotalAmount?.toFixed(2) || "-"}</TableCell>
              <TableCell
                className={`font-bold ${
                  (trade.profitLoss || 0) >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {trade.profitLoss?.toFixed(2) || "-"}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeTrade(trade.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {trades.length > 0 && (
        <div className="flex justify-end pt-4 border-t">
          <div className="text-lg font-bold">
            Total P&L:{" "}
            <span
              className={getTotalPnL() >= 0 ? "text-green-500" : "text-red-500"}
            >
              ${getTotalPnL().toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
