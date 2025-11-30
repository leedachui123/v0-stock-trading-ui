"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Search,
  TrendingUp,
  TrendingDown,
  SlidersHorizontal,
  ArrowUpDown,
  Plus,
  FolderPlus,
  Edit2,
  Trash2,
  Tags,
} from "lucide-react"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

type Stock = {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  volume: string
  amount: string
  turnover: string
  groups: string[] // 股票所属的分组ID数组
}

type StockGroup = {
  id: string
  name: string
}

const initialStockData: Stock[] = [
  {
    symbol: "600519",
    name: "贵州茅台",
    price: 1678.5,
    change: 2.35,
    changePercent: 0.14,
    volume: "12.5万手",
    amount: "21.0亿",
    turnover: "2.3%",
    groups: ["consumer"],
  },
  {
    symbol: "000001",
    name: "平安银行",
    price: 12.45,
    change: -0.23,
    changePercent: -1.81,
    volume: "458.2万手",
    amount: "57.3亿",
    turnover: "5.8%",
    groups: ["finance"],
  },
  {
    symbol: "600036",
    name: "招商银行",
    price: 35.67,
    change: 0.89,
    changePercent: 2.56,
    volume: "328.9万手",
    amount: "117.5亿",
    turnover: "3.2%",
    groups: ["finance"],
  },
  {
    symbol: "601318",
    name: "中国平安",
    price: 45.23,
    change: 1.45,
    changePercent: 3.31,
    volume: "256.7万手",
    amount: "116.2亿",
    turnover: "4.1%",
    groups: ["finance"],
  },
  {
    symbol: "000858",
    name: "五粮液",
    price: 158.9,
    change: -2.1,
    changePercent: -1.3,
    volume: "89.3万手",
    amount: "142.1亿",
    turnover: "1.9%",
    groups: ["consumer"],
  },
  {
    symbol: "600276",
    name: "恒瑞医药",
    price: 52.34,
    change: 0.67,
    changePercent: 1.3,
    volume: "67.8万手",
    amount: "35.5亿",
    turnover: "2.7%",
    groups: ["healthcare"],
  },
]

export function StockList() {
  const [stocks, setStocks] = useState<Stock[]>(initialStockData)
  const [groups, setGroups] = useState<StockGroup[]>([
    { id: "finance", name: "金融板块" },
    { id: "consumer", name: "消费板块" },
    { id: "healthcare", name: "医疗板块" },
  ])
  const [activeGroup, setActiveGroup] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("default")
  const [filterBy, setFilterBy] = useState("all")

  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false)
  const [isRenameGroupOpen, setIsRenameGroupOpen] = useState(false)
  const [newGroupName, setNewGroupName] = useState("")
  const [renameGroupId, setRenameGroupId] = useState("")
  const [renameGroupName, setRenameGroupName] = useState("")

  const [editingStock, setEditingStock] = useState<Stock | null>(null)
  const [isEditGroupsOpen, setIsEditGroupsOpen] = useState(false)
  const [selectedGroups, setSelectedGroups] = useState<string[]>([])

  const handleAddGroup = () => {
    if (newGroupName.trim()) {
      const newGroup: StockGroup = {
        id: `group-${Date.now()}`,
        name: newGroupName.trim(),
      }
      setGroups([...groups, newGroup])
      setNewGroupName("")
      setIsAddGroupOpen(false)
      setActiveGroup(newGroup.id)
    }
  }

  const handleDeleteGroup = (groupId: string) => {
    if (groupId === "all") return
    setStocks(stocks.map((stock) => ({ ...stock, groups: stock.groups.filter((g) => g !== groupId) })))
    setGroups(groups.filter((g) => g.id !== groupId))
    if (activeGroup === groupId) {
      setActiveGroup("all")
    }
  }

  const handleRenameGroup = () => {
    if (renameGroupName.trim() && renameGroupId) {
      setGroups(groups.map((g) => (g.id === renameGroupId ? { ...g, name: renameGroupName.trim() } : g)))
      setRenameGroupId("")
      setRenameGroupName("")
      setIsRenameGroupOpen(false)
    }
  }

  const openEditGroups = (stock: Stock) => {
    setEditingStock(stock)
    setSelectedGroups([...stock.groups])
    setIsEditGroupsOpen(true)
  }

  const handleSaveStockGroups = () => {
    if (editingStock) {
      setStocks(stocks.map((s) => (s.symbol === editingStock.symbol ? { ...s, groups: [...selectedGroups] } : s)))
      setIsEditGroupsOpen(false)
      setEditingStock(null)
      setSelectedGroups([])
    }
  }

  const toggleStockGroup = (groupId: string) => {
    if (selectedGroups.includes(groupId)) {
      setSelectedGroups(selectedGroups.filter((g) => g !== groupId))
    } else {
      setSelectedGroups([...selectedGroups, groupId])
    }
  }

  const startRenameGroup = (groupId: string, groupName: string) => {
    setRenameGroupId(groupId)
    setRenameGroupName(groupName)
    setIsRenameGroupOpen(true)
  }

  const currentStocks = activeGroup === "all" ? stocks : stocks.filter((stock) => stock.groups.includes(activeGroup))

  const filteredStocks = currentStocks
    .filter((stock) => stock.symbol.includes(searchTerm) || stock.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((stock) => {
      if (filterBy === "up") return stock.changePercent > 0
      if (filterBy === "down") return stock.changePercent < 0
      return true
    })
    .sort((a, b) => {
      if (sortBy === "change-asc") return a.changePercent - b.changePercent
      if (sortBy === "change-desc") return b.changePercent - a.changePercent
      if (sortBy === "price-asc") return a.price - b.price
      if (sortBy === "price-desc") return b.price - a.price
      return 0
    })

  const getGroupStockCount = (groupId: string) => {
    if (groupId === "all") return stocks.length
    return stocks.filter((s) => s.groups.includes(groupId)).length
  }

  return (
    <div className="space-y-4">
      <Card className="bg-card border-border shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="搜索股票代码或名称..."
                className="pl-10 bg-background border-border"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={filterBy} onValueChange={setFilterBy}>
              <SelectTrigger className="w-full sm:w-[160px] bg-background">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                <SelectValue placeholder="筛选" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部股票</SelectItem>
                <SelectItem value="up">上涨</SelectItem>
                <SelectItem value="down">下跌</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-[160px] bg-background">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                <SelectValue placeholder="排序" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">默认排序</SelectItem>
                <SelectItem value="change-desc">涨幅从高到低</SelectItem>
                <SelectItem value="change-asc">涨幅从低到高</SelectItem>
                <SelectItem value="price-desc">价格从高到低</SelectItem>
                <SelectItem value="price-asc">价格从低到高</SelectItem>
              </SelectContent>
            </Select>

            <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              新增关注
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border shadow-sm">
        <CardHeader className="border-b border-border pb-0">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-base font-semibold text-foreground">我的股票池</CardTitle>

            <Dialog open={isAddGroupOpen} onOpenChange={setIsAddGroupOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <FolderPlus className="mr-2 h-4 w-4" />
                  新建分组
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>新建分组</DialogTitle>
                  <DialogDescription>为您的股票创建一个新的分组</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="group-name">分组名称</Label>
                    <Input
                      id="group-name"
                      placeholder="例如：科技板块"
                      value={newGroupName}
                      onChange={(e) => setNewGroupName(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddGroup()}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddGroupOpen(false)}>
                    取消
                  </Button>
                  <Button onClick={handleAddGroup}>确认</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs value={activeGroup} onValueChange={setActiveGroup} className="w-full">
            <TabsList className="h-auto w-full justify-start gap-2 bg-transparent p-0 flex-wrap">
              <div className="relative group/tab">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md px-4 py-2"
                >
                  全部股票
                  <span className="ml-2 text-xs opacity-70">({getGroupStockCount("all")})</span>
                </TabsTrigger>
              </div>

              {groups.map((group) => (
                <div key={group.id} className="relative group/tab">
                  <TabsTrigger
                    value={group.id}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md px-4 py-2 relative"
                  >
                    {group.name}
                    <span className="ml-2 text-xs opacity-70">({getGroupStockCount(group.id)})</span>
                  </TabsTrigger>

                  <div className="absolute -right-2 -top-1 opacity-0 group-hover/tab:opacity-100 transition-opacity">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 rounded-full bg-secondary hover:bg-secondary/80"
                        >
                          <span className="text-xs">···</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => startRenameGroup(group.id, group.name)}>
                          <Edit2 className="mr-2 h-4 w-4" />
                          重命名
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteGroup(group.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          删除分组
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </TabsList>
          </Tabs>
        </CardHeader>

        <Dialog open={isRenameGroupOpen} onOpenChange={setIsRenameGroupOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>重命名分组</DialogTitle>
              <DialogDescription>修改分组的名称</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="rename-group">新的分组名称</Label>
                <Input
                  id="rename-group"
                  value={renameGroupName}
                  onChange={(e) => setRenameGroupName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleRenameGroup()}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRenameGroupOpen(false)}>
                取消
              </Button>
              <Button onClick={handleRenameGroup}>确认</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditGroupsOpen} onOpenChange={setIsEditGroupsOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>编辑股票分组</DialogTitle>
              <DialogDescription>
                为 {editingStock?.name} ({editingStock?.symbol}) 选择所属分组
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-3">
                {groups.map((group) => (
                  <div key={group.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-secondary/50">
                    <Checkbox
                      id={`group-${group.id}`}
                      checked={selectedGroups.includes(group.id)}
                      onCheckedChange={() => toggleStockGroup(group.id)}
                    />
                    <Label
                      htmlFor={`group-${group.id}`}
                      className="flex-1 cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {group.name}
                    </Label>
                  </div>
                ))}
                {groups.length === 0 && (
                  <div className="text-center text-sm text-muted-foreground py-4">暂无分组，请先创建分组</div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditGroupsOpen(false)}>
                取消
              </Button>
              <Button onClick={handleSaveStockGroups}>保存</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {filteredStocks.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground">
                {currentStocks.length === 0 ? "该分组暂无股票" : "未找到匹配的股票"}
              </div>
            ) : (
              filteredStocks.map((stock) => (
                <div key={stock.symbol} className="p-4 hover:bg-secondary/50 transition-colors cursor-pointer group">
                  <div className="flex items-center justify-between gap-4">
                    {/* 左侧:股票信息 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-mono text-sm font-medium text-muted-foreground">{stock.symbol}</span>
                        <span className="text-base font-semibold text-foreground">{stock.name}</span>
                        <div className="flex gap-1 flex-wrap">
                          {stock.groups.map((groupId) => {
                            const group = groups.find((g) => g.id === groupId)
                            return group ? (
                              <Badge key={groupId} variant="secondary" className="text-xs px-2 py-0">
                                {group.name}
                              </Badge>
                            ) : null
                          })}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>成交量: {stock.volume}</span>
                        <span>成交额: {stock.amount}</span>
                        <span>换手率: {stock.turnover}</span>
                      </div>
                    </div>

                    {/* 中间:价格信息 */}
                    <div className="text-right">
                      <div className="font-mono text-lg font-bold text-foreground mb-1">{stock.price.toFixed(2)}</div>
                      <div className="flex items-center justify-end gap-1">
                        {stock.changePercent >= 0 ? (
                          <>
                            <TrendingUp className="h-3 w-3 text-accent" />
                            <span className="font-mono text-sm font-medium text-accent">
                              +{stock.change.toFixed(2)} (+{stock.changePercent.toFixed(2)}%)
                            </span>
                          </>
                        ) : (
                          <>
                            <TrendingDown className="h-3 w-3 text-success" />
                            <span className="font-mono text-sm font-medium text-success">
                              {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 bg-transparent"
                        onClick={() => openEditGroups(stock)}
                      >
                        <Tags className="h-4 w-4 mr-1" />
                        分组
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 bg-transparent">
                        复盘
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 bg-transparent">
                        统计
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
