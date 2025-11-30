"use client"

import { StockList } from "@/components/stock-list"
import { TradeReview } from "@/components/trade-review"
import { StrategyStats } from "@/components/strategy-stats"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, TrendingUp, ListChecks, User, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useTheme } from "@/components/theme-provider"

export default function TradingReviewApp() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Logo */}
              <div className="flex h-10 w-10 items-center justify-center rounded bg-primary">
                <BarChart3 className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">股票交易复盘系统</h1>
                <p className="text-xs text-muted-foreground">专业的股票交易分析平台</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="h-10 w-10"
              >
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <span className="sr-only">切换主题</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <User className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>个人中心</DropdownMenuItem>
                  <DropdownMenuItem>设置</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">退出登录</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-6">
        <Tabs defaultValue="stocks" className="w-full">
          <TabsList className="grid w-full max-w-lg grid-cols-3 h-12 bg-card border border-border">
            <TabsTrigger
              value="stocks"
              className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <ListChecks className="h-4 w-4" />
              <span className="font-medium">股票列表</span>
            </TabsTrigger>
            <TabsTrigger
              value="review"
              className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <TrendingUp className="h-4 w-4" />
              <span className="font-medium">交易复盘</span>
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <BarChart3 className="h-4 w-4" />
              <span className="font-medium">策略统计</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stocks" className="mt-6">
            <StockList />
          </TabsContent>

          <TabsContent value="review" className="mt-6">
            <TradeReview />
          </TabsContent>

          <TabsContent value="stats" className="mt-6">
            <StrategyStats />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
