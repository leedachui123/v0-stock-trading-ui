"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, TrendingUp, TrendingDown, Clock, DollarSign, ArrowLeft, Save } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

const tradeHistory = [
  {
    id: 1,
    date: "2024-11-28 09:35:20",
    symbol: "600519",
    name: "贵州茅台",
    type: "买入",
    buyPrice: 1650.0,
    sellPrice: 1678.5,
    shares: 100,
    profit: 2850,
    profitPercent: 1.73,
    strategy: "趋势跟踪",
    notes: "突破前高，成交量放大，符合买入条件",
  },
  {
    id: 2,
    date: "2024-11-28 14:25:10",
    symbol: "600519",
    name: "贵州茅台",
    type: "卖出",
    buyPrice: 1650.0,
    sellPrice: 1678.5,
    shares: 100,
    profit: 2850,
    profitPercent: 1.73,
    strategy: "趋势跟踪",
    notes: "达到目标价位,获利了结",
  },
  {
    id: 3,
    date: "2024-11-25 10:15:30",
    symbol: "600036",
    name: "招商银行",
    type: "买入",
    buyPrice: 34.5,
    sellPrice: 35.67,
    shares: 1000,
    profit: 1170,
    profitPercent: 3.39,
    strategy: "价值投资",
    notes: "估值合理，业绩稳定增长",
  },
  {
    id: 4,
    date: "2024-11-22 13:50:45",
    symbol: "000858",
    name: "五粮液",
    type: "卖出",
    buyPrice: 165.0,
    sellPrice: 158.9,
    shares: 200,
    profit: -1220,
    profitPercent: -3.7,
    strategy: "止损",
    notes: "跌破支撑位,及时止损",
  },
]

export function TradeReview() {
  const [notes, setNotes] = useState("")
  const [timeRange, setTimeRange] = useState("month")
  const [filterType, setFilterType] = useState("all")

  const filteredTrades = tradeHistory.filter((trade) => {
    if (filterType === "buy") return trade.type === "买入"
    if (filterType === "sell") return trade.type === "卖出"
    return true
  })

  return (
    <div className="space-y-4">
      <Card className="bg-card border-border shadow-sm">
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="h-9 w-9 bg-transparent">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm text-muted-foreground">600519</span>
                  <span className="text-base font-semibold text-foreground">贵州茅台</span>
                  <span className="font-mono text-base font-bold text-foreground">1678.50</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">当前复盘股票</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[120px] bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">当日</SelectItem>
                  <SelectItem value="week">本周</SelectItem>
                  <SelectItem value="month">本月</SelectItem>
                  <SelectItem value="custom">自定义</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[120px] bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部记录</SelectItem>
                  <SelectItem value="buy">仅买入</SelectItem>
                  <SelectItem value="sell">仅卖出</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">总交易次数</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">23</div>
            <p className="text-xs text-muted-foreground mt-1">本月</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">盈利交易</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">17</div>
            <p className="text-xs text-muted-foreground mt-1">胜率 73.9%</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">亏损交易</CardTitle>
            <TrendingDown className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">6</div>
            <p className="text-xs text-muted-foreground mt-1">需要优化</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">净利润</CardTitle>
            <DollarSign className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">¥45,280</div>
            <p className="text-xs text-muted-foreground mt-1">+12.3%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="bg-card border-border shadow-sm lg:col-span-2">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-base font-semibold">交易记录</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
              {filteredTrades.map((trade) => (
                <div key={trade.id} className="p-4 hover:bg-secondary/50 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-muted-foreground">{trade.symbol}</span>
                        <span className="text-sm font-medium text-foreground">{trade.name}</span>
                        <Badge variant={trade.type === "买入" ? "default" : "secondary"} className="h-5 text-xs">
                          {trade.type}
                        </Badge>
                        <Badge variant="outline" className="h-5 text-xs">
                          {trade.strategy}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {trade.date}
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-base font-bold font-mono ${trade.profit >= 0 ? "text-accent" : "text-success"}`}
                      >
                        {trade.profit >= 0 ? "+" : ""}¥{Math.abs(trade.profit).toLocaleString()}
                      </div>
                      <div className={`text-xs font-mono ${trade.profit >= 0 ? "text-accent" : "text-success"}`}>
                        {trade.profit >= 0 ? "+" : ""}
                        {trade.profitPercent.toFixed(2)}%
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 p-3 rounded bg-secondary/30">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">买入价</div>
                      <div className="font-mono text-sm text-foreground">¥{trade.buyPrice.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">卖出价</div>
                      <div className="font-mono text-sm text-foreground">¥{trade.sellPrice.toFixed(2)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">数量</div>
                      <div className="font-mono text-sm text-foreground">{trade.shares} 股</div>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="text-xs text-muted-foreground mb-1">交易笔记</div>
                    <div className="text-sm text-foreground">{trade.notes}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="bg-card border-border shadow-sm">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-base font-semibold">K线图表</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="aspect-square bg-secondary/30 rounded flex items-center justify-center text-muted-foreground text-sm">
                K线图表区域
                <br />
                (需集成图表库)
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border shadow-sm">
            <CardHeader className="border-b border-border">
              <CardTitle className="text-base font-semibold">复盘笔记</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <Textarea
                placeholder="记录您的复盘心得和经验总结..."
                className="min-h-[120px] bg-background resize-none"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <Button className="w-full mt-3 bg-primary hover:bg-primary/90">
                <Save className="mr-2 h-4 w-4" />
                保存笔记
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
