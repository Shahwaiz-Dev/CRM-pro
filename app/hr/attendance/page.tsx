'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar } from '@/components/ui/calendar';
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
import { Textarea } from '@/components/ui/textarea';
import { Plus, Search, Filter, Clock, CheckCircle, XCircle, AlertTriangle, Calendar as CalendarIcon } from 'lucide-react';

const attendanceData = [
  {
    id: 1,
    employeeId: 'EMP001',
    name: 'Alice Johnson',
    department: 'Engineering',
    date: '2024-01-22',
    checkIn: '09:00 AM',
    checkOut: '06:15 PM',
    totalHours: '9h 15m',
    status: 'Present',
    overtime: '1h 15m',
    avatar: '/avatars/alice.jpg',
  },
  {
    id: 2,
    employeeId: 'EMP002',
    name: 'Bob Wilson',
    department: 'Product',
    date: '2024-01-22',
    checkIn: '08:45 AM',
    checkOut: '05:30 PM',
    totalHours: '8h 45m',
    status: 'Present',
    overtime: '0h 45m',
    avatar: '/avatars/bob.jpg',
  },
  {
    id: 3,
    employeeId: 'EMP003',
    name: 'Carol Martinez',
    department: 'Human Resources',
    date: '2024-01-22',
    checkIn: '09:15 AM',
    checkOut: '05:45 PM',
    totalHours: '8h 30m',
    status: 'Late',
    overtime: '0h 30m',
    avatar: '/avatars/carol.jpg',
  },
  {
    id: 4,
    employeeId: 'EMP004',
    name: 'David Chen',
    department: 'Sales',
    date: '2024-01-22',
    checkIn: '-',
    checkOut: '-',
    totalHours: '0h 0m',
    status: 'Absent',
    overtime: '0h 0m',
    avatar: '/avatars/david.jpg',
  },
];

const leaveRequests = [
  {
    id: 1,
    employee: 'Sarah Johnson',
    type: 'Vacation',
    startDate: '2024-02-05',
    endDate: '2024-02-09',
    days: 5,
    status: 'Pending',
    reason: 'Family vacation',
  },
  {
    id: 2,
    employee: 'Mike Thompson',
    type: 'Sick Leave',
    startDate: '2024-01-25',
    endDate: '2024-01-26',
    days: 2,
    status: 'Approved',
    reason: 'Medical appointment',
  },
];

export default function AttendancePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredAttendance = attendanceData.filter(record =>
    record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'Late':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'Absent':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      default:
        return '';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Present':
        return <CheckCircle className="w-3 h-3 mr-1" />;
      case 'Late':
        return <AlertTriangle className="w-3 h-3 mr-1" />;
      case 'Absent':
        return <XCircle className="w-3 h-3 mr-1" />;
      default:
        return null;
    }
  };

  const presentCount = attendanceData.filter(r => r.status === 'Present').length;
  const lateCount = attendanceData.filter(r => r.status === 'Late').length;
  const absentCount = attendanceData.filter(r => r.status === 'Absent').length;
  const attendanceRate = ((presentCount + lateCount) / attendanceData.length) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1>
          <p className="text-gray-600 mt-2">Track employee attendance and manage leave requests</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Leave Request
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Submit Leave Request</DialogTitle>
              <DialogDescription>
                Create a new leave request for employee time off.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employee">Employee</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alice">Alice Johnson</SelectItem>
                      <SelectItem value="bob">Bob Wilson</SelectItem>
                      <SelectItem value="carol">Carol Martinez</SelectItem>
                      <SelectItem value="david">David Chen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leaveType">Leave Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vacation">Vacation</SelectItem>
                      <SelectItem value="sick">Sick Leave</SelectItem>
                      <SelectItem value="personal">Personal Leave</SelectItem>
                      <SelectItem value="maternity">Maternity Leave</SelectItem>
                      <SelectItem value="emergency">Emergency Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Textarea id="reason" placeholder="Please provide reason for leave..." />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsDialogOpen(false)}>
                Submit Request
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{presentCount}</div>
            <p className="text-xs text-muted-foreground">
              {((presentCount / attendanceData.length) * 100).toFixed(1)}% of workforce
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Late Arrivals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{lateCount}</div>
            <p className="text-xs text-muted-foreground">Arrived after 9:00 AM</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{absentCount}</div>
            <p className="text-xs text-muted-foreground">Without prior notice</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendanceRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.1%</span> from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Daily Attendance</CardTitle>
                <CardDescription>Employee check-in and check-out records</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search employees..."
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
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Total Hours</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAttendance.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={record.avatar} alt={record.name} />
                          <AvatarFallback>
                            {record.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{record.name}</div>
                          <div className="text-sm text-gray-500">{record.department}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1 text-gray-400" />
                        {record.checkIn}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1 text-gray-400" />
                        {record.checkOut}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{record.totalHours}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(record.status)}>
                        <div className="flex items-center">
                          {getStatusIcon(record.status)}
                          {record.status}
                        </div>
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Select date to view attendance</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
          <CardDescription>Pending and recent leave requests</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaveRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div>
                    <h3 className="font-medium">{request.employee}</h3>
                    <p className="text-sm text-gray-600">{request.type} - {request.days} days</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="flex items-center text-sm">
                      <CalendarIcon className="w-3 h-3 mr-1 text-gray-400" />
                      {request.startDate} to {request.endDate}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{request.reason}</div>
                  </div>
                  <Badge variant={request.status === 'Approved' ? 'default' : 'secondary'}>
                    {request.status}
                  </Badge>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Approve
                    </Button>
                    <Button variant="outline" size="sm">
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}