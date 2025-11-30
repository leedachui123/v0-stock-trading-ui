"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { TrendingUp, Target, Percent, Award, Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"

const strategyPerformance = [
  { name: "趋势跟踪", trades: 12, winRate: 75, profit: 18500 },
  { name: "价值投资", trades: 8, winRate: 87.5, profit: 22300 },
  { name: "波段操作", trades: 15, winRate: 60, profit: 8900 },
  { name: "止损", trades: 6, winRate: 0, profit: -4420 },
]

const monthlyData = [
  { month: "7月", profit: 8500 },
  { month: "8月", profit: 12300 },
  { month: "9月", profit: -2100 },
  { month: "10月", profit: 15600 },
  { month: "11月", profit: 10980 },
]

const winLossData = [
  { name: "盈利交易", value: 17, color: "#F53F3F" },
  { name: "亏损交易", value: 6, color: "#00B42A" },
]

const revenueData = [
  { date: "11-01", value: 1200 },
  { date: "11-05", value: 3400 },
  { date: "11-10", value: 2100 },
  { date: "11-15", value: 5600 },
  { date: "11-20", value: 4800 },
  { date: "11-25", value: 7200 },
  { date: "11-30", value: 10980 },
]

export function StrategyStats() {
  const [timeRange, setTimeRange] = useState("month")
  const [strategyFilter, setStrategyFilter] = useState("all")

  const totalProfit = strategyPerformance.reduce((sum, s) => sum + s.profit, 0)
  const avgWinRate = strategyPerformance.reduce((sum, s) => sum + s.winRate, 0) / strategyPerformance.length

  return (
    <div className="space-y-4">
      <Card className="bg-card border-border shadow-sm">
        <CardContent className="py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="text-base font-semibold text-foreground">策略统计分析</div>
            <div className="flex items-center gap-2">
              <Select value={strategyFilter} onValueChange={setStrategyFilter}>
                <SelectTrigger className="w-[140px] bg-background">
                  <SelectValue placeholder="选择策略" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部策略</SelectItem>
                  <SelectItem value="trend">趋势跟踪</SelectItem>
                  <SelectItem value="value">价值投资</SelectItem>
                  <SelectItem value="swing">波段操作</SelectItem>
                </SelectContent>
              </Select>

              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[120px] bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">本周</SelectItem>
                  <SelectItem value="month">本月</SelectItem>
                  <SelectItem value="quarter">本季度</SelectItem>
                  <SelectItem value="year">本年</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="gap-2 bg-transparent">
                <Download className="h-4 w-4" />
                导出
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">策略总数</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">4</div>
            <p className="text-xs text-muted-foreground mt-1">活跃策略</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">平均胜率</CardTitle>
            <Percent className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{avgWinRate.toFixed(1)}%</div>
            <p className="text-xs text-accent mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              整体表现良好
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">最佳策略</CardTitle>
            <Award className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-accent">价值投资</div>
            <p className="text-xs text-muted-foreground mt-1">87.5% 胜率</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">策略总收益</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">¥{totalProfit.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">累计收益</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-base font-semibold">策略表现</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              <div className="grid grid-cols-4 gap-4 px-4 py-3 text-xs font-medium text-muted-foreground bg-secondary/30">
                <div>策略名称</div>
                <div className="text-right">交易次数</div>
                <div className="text-right">胜率</div>
                <div className="text-right">收益</div>
              </div>
              {strategyPerformance.map((strategy, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 px-4 py-3 hover:bg-secondary/50 transition-colors">
                  <div className="text-sm font-medium text-foreground">{strategy.name}</div>
                  <div className="text-right font-mono text-sm text-muted-foreground">{strategy.trades}</div>
                  <div className="text-right">
                    <Badge variant={strategy.winRate >= 70 ? "default" : "secondary"} className="h-5 text-xs font-mono">
                      {strategy.winRate.toFixed(1)}%
                    </Badge>
                  </div>
                  <div
                    className={`text-right text-sm font-mono font-medium ${strategy.profit >= 0 ? "text-accent" : "text-success"}`}
                  >
                    {strategy.profit >= 0 ? "+" : ""}¥{Math.abs(strategy.profit).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 盈亏分布饼图 */}
        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-base font-semibold">盈亏分布</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={winLossData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {winLossData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #E5E6EB",
                    borderRadius: "4px",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-base font-semibold">收益率曲线</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E6EB" />
                <XAxis dataKey="date" stroke="#86909C" style={{ fontSize: "12px" }} />
                <YAxis stroke="#86909C" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #E5E6EB",
                    borderRadius: "4px",
                    fontSize: "12px",
                  }}
                />
                <Line type="monotone" dataKey="value" stroke="#165DFF" strokeWidth={2} dot={{ fill: "#165DFF" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 月度收益柱状图 */}
        <Card className="bg-card border-border shadow-sm">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-base font-semibold">月度收益趋势</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E6EB" />
                <XAxis dataKey="month" stroke="#86909C" style={{ fontSize: "12px" }} />
                <YAxis stroke="#86909C" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #E5E6EB",
                    borderRadius: "4px",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="profit" fill="#165DFF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border shadow-sm">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-base font-semibold">策略优化建议</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2 p-3 rounded bg-secondary/30">
              <div className="mt-0.5 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary text-xs font-semibold">1</span>
              </div>
              <div>
                <div className="font-medium text-foreground mb-1">价值投资策略表现优异</div>
                <div className="text-muted-foreground text-xs">
                  该策略胜率达87.5%，建议增加仓位比例，同时保持严格的选股标准
                </div>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 rounded bg-secondary/30">
              <div className="mt-0.5 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary text-xs font-semibold">2</span>
              </div>
              <div>
                <div className="font-medium text-foreground mb-1">波段操作需要优化</div>
                <div className="text-muted-foreground text-xs">胜率仅60%，建议优化买卖点判断标准，加强技术分析能力</div>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 rounded bg-secondary/30">
              <div className="mt-0.5 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="text-primary text-xs font-semibold">3</span>
              </div>
              <div>
                <div className="font-medium text-foreground mb-1">止损执行良好</div>
                <div className="text-muted-foreground text-xs">
                  虽然止损交易产生亏损，但有效控制了风险，建议继续保持严格的止损纪律
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
