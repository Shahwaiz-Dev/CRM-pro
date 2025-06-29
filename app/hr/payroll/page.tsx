'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { Plus, Search, Filter, Edit, Download, DollarSign, Calendar, Clock, TrendingUp } from 'lucide-react';

const payrollData = [
  {
    id: 1,
    employeeId: 'EMP001',
    name: 'Alice Johnson',
    position: 'Senior Developer',
    department: 'Engineering',
    baseSalary: 95000,
    overtime: 2400,
    bonuses: 5000,
    deductions: 1200,
    netPay: 101200,
    payPeriod: 'January 2024',
    status: 'Paid',
    payDate: '2024-01-31',
    avatar: '/avatars/alice.jpg',
  },
  {
    id: 2,
    employeeId: 'EMP002',
    name: 'Bob Wilson',
    position: 'Product Manager',
    department: 'Product',
    baseSalary: 105000,
    overtime: 0,
    bonuses: 8000,
    deductions: 1500,
    netPay: 111500,
    payPeriod: 'January 2024',
    status: 'Paid',
    payDate: '2024-01-31',
    avatar: '/avatars/bob.jpg',
  },
  {
    id: 3,
    employeeId: 'EMP003',
    name: 'Carol Martinez',
    position: 'HR Specialist',
    department: 'Human Resources',
    baseSalary: 65000,
    overtime: 800,
    bonuses: 2000,
    deductions: 800,
    netPay: 67000,
    payPeriod: 'January 2024',
    status: 'Processing',
    payDate: '2024-01-31',
    avatar: '/avatars/carol.jpg',
  },
  {
    id: 4,
    employeeId: 'EMP004',
    name: 'David Chen',
    position: 'Sales Manager',
    department: 'Sales',
    baseSalary: 85000,
    overtime: 1200,
    bonuses: 12000,
    deductions: 1100,
    netPay: 97100,
    payPeriod: 'January 2024',
    status: 'Pending',
    payDate: '2024-01-31',
    avatar: '/avatars/david.jpg',
  },
];

export default function PayrollPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredPayroll = payrollData.filter(payroll =>
    payroll.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payroll.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payroll.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPayroll = payrollData.reduce((sum, item) => sum + item.netPay, 0);
  const avgSalary = totalPayroll / payrollData.length;
  const totalOvertime = payrollData.reduce((sum, item) => sum + item.overtime, 0);
  const totalBonuses = payrollData.reduce((sum, item) => sum + item.bonuses, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'Processing':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payroll Management</h1>
          <p className="text-gray-600 mt-2">Manage employee compensation and payroll processing</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Process Payroll
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Process New Payroll</DialogTitle>
                <DialogDescription>
                  Create a new payroll batch for the selected pay period.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="payPeriod">Pay Period</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pay period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="feb2024">February 2024</SelectItem>
                        <SelectItem value="mar2024">March 2024</SelectItem>
                        <SelectItem value="apr2024">April 2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payDate">Pay Date</Label>
                    <Input id="payDate" type="date" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All departments" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="product">Product</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="hr">Human Resources</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payrollType">Payroll Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="regular">Regular Payroll</SelectItem>
                        <SelectItem value="bonus">Bonus Payment</SelectItem>
                        <SelectItem value="overtime">Overtime Payment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>
                  Process Payroll
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Payroll</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPayroll.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5.2%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Salary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${Math.round(avgSalary).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Per employee</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Overtime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalOvertime.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This pay period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Bonuses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBonuses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Performance bonuses</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Payroll Records</CardTitle>
              <CardDescription>View and manage employee payroll information</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search payroll..."
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
                <TableHead>Employee</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Base Salary</TableHead>
                <TableHead>Overtime</TableHead>
                <TableHead>Bonuses</TableHead>
                <TableHead>Deductions</TableHead>
                <TableHead>Net Pay</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayroll.map((payroll) => (
                <TableRow key={payroll.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={payroll.avatar} alt={payroll.name} />
                        <AvatarFallback>
                          {payroll.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{payroll.name}</div>
                        <div className="text-sm text-gray-500">{payroll.employeeId}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{payroll.position}</div>
                      <div className="text-sm text-gray-500">{payroll.department}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">${payroll.baseSalary.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1 text-gray-400" />
                      ${payroll.overtime.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
                      ${payroll.bonuses.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-red-600">-${payroll.deductions.toLocaleString()}</TableCell>
                  <TableCell className="font-bold text-green-600">${payroll.netPay.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(payroll.status)}>
                      {payroll.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}