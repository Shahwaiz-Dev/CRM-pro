'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Filter, Package, TrendingUp, TrendingDown, AlertTriangle, ArrowUpDown } from 'lucide-react';

const stockMovements = [
  {
    id: 1,
    productName: 'Wireless Headphones Pro',
    sku: 'WHP-001',
    type: 'Stock In',
    quantity: 50,
    previousStock: 45,
    currentStock: 95,
    date: '2024-01-22',
    reference: 'PO-2024-001',
    reason: 'Purchase Order',
    location: 'Warehouse A',
  },
  {
    id: 2,
    productName: 'Smart Fitness Tracker',
    sku: 'SFT-002',
    type: 'Stock Out',
    quantity: -12,
    previousStock: 20,
    currentStock: 8,
    date: '2024-01-21',
    reference: 'SO-2024-045',
    reason: 'Sales Order',
    location: 'Warehouse A',
  },
  {
    id: 3,
    productName: 'USB-C Hub Pro',
    sku: 'UCH-004',
    type: 'Stock Adjustment',
    quantity: -3,
    previousStock: 81,
    currentStock: 78,
    date: '2024-01-20',
    reference: 'ADJ-2024-003',
    reason: 'Damaged Items',
    location: 'Warehouse B',
  },
  {
    id: 4,
    productName: 'Portable Bluetooth Speaker',
    sku: 'PBS-003',
    type: 'Stock Transfer',
    quantity: 25,
    previousStock: 0,
    currentStock: 25,
    date: '2024-01-19',
    reference: 'TRF-2024-012',
    reason: 'Inter-warehouse Transfer',
    location: 'Warehouse A',
  },
];

const lowStockItems = [
  { name: 'Smart Fitness Tracker', sku: 'SFT-002', current: 8, minimum: 15, location: 'Warehouse A' },
  { name: 'Wireless Mouse Pro', sku: 'WMP-005', current: 12, minimum: 20, location: 'Warehouse B' },
  { name: 'Gaming Keyboard', sku: 'GKB-006', current: 5, minimum: 10, location: 'Warehouse A' },
];

export default function StockPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredMovements = stockMovements.filter(movement =>
    movement.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movement.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    movement.reference.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMovementColor = (type: string) => {
    switch (type) {
      case 'Stock In':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'Stock Out':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      case 'Stock Adjustment':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'Stock Transfer':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      default:
        return '';
    }
  };

  const getMovementIcon = (type: string) => {
    switch (type) {
      case 'Stock In':
        return <TrendingUp className="w-3 h-3 mr-1" />;
      case 'Stock Out':
        return <TrendingDown className="w-3 h-3 mr-1" />;
      case 'Stock Adjustment':
        return <AlertTriangle className="w-3 h-3 mr-1" />;
      case 'Stock Transfer':
        return <ArrowUpDown className="w-3 h-3 mr-1" />;
      default:
        return null;
    }
  };

  const totalMovements = stockMovements.length;
  const stockInCount = stockMovements.filter(m => m.type === 'Stock In').length;
  const stockOutCount = stockMovements.filter(m => m.type === 'Stock Out').length;
  const adjustmentCount = stockMovements.filter(m => m.type === 'Stock Adjustment').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Stock Management</h1>
          <p className="text-gray-600 mt-2">Track inventory movements and stock levels</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Stock Movement
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add Stock Movement</DialogTitle>
              <DialogDescription>
                Record a new stock movement transaction.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product">Product</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="whp-001">Wireless Headphones Pro</SelectItem>
                      <SelectItem value="sft-002">Smart Fitness Tracker</SelectItem>
                      <SelectItem value="pbs-003">Portable Bluetooth Speaker</SelectItem>
                      <SelectItem value="uch-004">USB-C Hub Pro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="movementType">Movement Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stock-in">Stock In</SelectItem>
                      <SelectItem value="stock-out">Stock Out</SelectItem>
                      <SelectItem value="adjustment">Stock Adjustment</SelectItem>
                      <SelectItem value="transfer">Stock Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input id="quantity" type="number" placeholder="50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="warehouse-a">Warehouse A</SelectItem>
                      <SelectItem value="warehouse-b">Warehouse B</SelectItem>
                      <SelectItem value="retail-store">Retail Store</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reference">Reference</Label>
                  <Input id="reference" placeholder="PO-2024-001" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="purchase-order">Purchase Order</SelectItem>
                    <SelectItem value="sales-order">Sales Order</SelectItem>
                    <SelectItem value="damaged-items">Damaged Items</SelectItem>
                    <SelectItem value="transfer">Inter-warehouse Transfer</SelectItem>
                    <SelectItem value="return">Customer Return</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>
                Add Movement
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Movements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMovements}</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Stock In</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stockInCount}</div>
            <p className="text-xs text-muted-foreground">Incoming stock</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Stock Out</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stockOutCount}</div>
            <p className="text-xs text-muted-foreground">Outgoing stock</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Adjustments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{adjustmentCount}</div>
            <p className="text-xs text-muted-foreground">Stock corrections</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Stock Movements</CardTitle>
                <CardDescription>Recent inventory transactions and changes</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search movements..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Stock Level</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Reference</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMovements.map((movement) => (
                  <TableRow key={movement.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{movement.productName}</div>
                        <div className="text-sm text-gray-500">SKU: {movement.sku}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getMovementColor(movement.type)}>
                        <div className="flex items-center">
                          {getMovementIcon(movement.type)}
                          {movement.type}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className={`font-medium ${movement.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{movement.currentStock}</div>
                        <div className="text-sm text-gray-500">
                          from {movement.previousStock}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{movement.date}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{movement.reference}</div>
                        <div className="text-sm text-gray-500">{movement.reason}</div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Low Stock Alerts</CardTitle>
            <CardDescription>Items requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-red-50">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.sku}</div>
                      <div className="text-sm text-gray-500">{item.location}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-red-600">{item.current}</div>
                    <div className="text-sm text-gray-500">Min: {item.minimum}</div>
                  </div>
                </div>
              ))}
              <Button className="w-full" variant="outline">
                <Package className="w-4 h-4 mr-2" />
                Create Reorder List
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}