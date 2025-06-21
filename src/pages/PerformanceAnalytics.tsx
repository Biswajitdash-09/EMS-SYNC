
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { BarChart3, Target, Star, Calendar, MessageSquare, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PerformanceAnalytics = () => {
  const navigate = useNavigate();

  const performanceData = [
    {
      employee: 'John Smith',
      department: 'Engineering',
      currentScore: 4.2,
      goalProgress: 85,
      lastReview: '2024-03-15',
      nextReview: '2024-09-15',
      status: 'On Track'
    },
    {
      employee: 'Sarah Johnson',
      department: 'HR',
      currentScore: 4.7,
      goalProgress: 92,
      lastReview: '2024-02-20',
      nextReview: '2024-08-20',
      status: 'Exceeding'
    },
    {
      employee: 'Mike Chen',
      department: 'Finance',
      currentScore: 3.8,
      goalProgress: 70,
      lastReview: '2024-04-10',
      nextReview: '2024-10-10',
      status: 'Needs Improvement'
    }
  ];

  const goals = [
    { id: 1, title: 'Complete React Training', progress: 75, deadline: '2024-07-30' },
    { id: 2, title: 'Lead Team Project', progress: 50, deadline: '2024-08-15' },
    { id: 3, title: 'Improve Code Quality Metrics', progress: 90, deadline: '2024-07-01' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Exceeding': return 'bg-green-100 text-green-800';
      case 'On Track': return 'bg-blue-100 text-blue-800';
      case 'Needs Improvement': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/dashboard')}>
                ← Back to Dashboard
              </Button>
              <div className="flex items-center space-x-2">
                <BarChart3 className="w-6 h-6 text-red-600" />
                <h1 className="text-xl font-bold text-gray-900">Performance Analytics</h1>
              </div>
            </div>
            <Button className="bg-red-600 hover:bg-red-700">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Review
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="goals">Goals & KPIs</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Performance Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.2</div>
                  <p className="text-xs text-muted-foreground">Out of 5.0</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Goals Completed</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78%</div>
                  <p className="text-xs text-muted-foreground">This quarter</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Reviews Due</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-xs text-muted-foreground">Above 4.5 rating</p>
                </CardContent>
              </Card>
            </div>

            {/* Performance Table */}
            <Card>
              <CardHeader>
                <CardTitle>Employee Performance Monitoring</CardTitle>
                <CardDescription>Track individual and team performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Current Score</TableHead>
                      <TableHead>Goal Progress</TableHead>
                      <TableHead>Last Review</TableHead>
                      <TableHead>Next Review</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {performanceData.map((employee, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{employee.employee}</TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>{employee.currentScore}/5.0</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-2 bg-gray-200 rounded">
                              <div 
                                className="h-full bg-blue-500 rounded" 
                                style={{ width: `${employee.goalProgress}%` }}
                              ></div>
                            </div>
                            <span className="text-sm">{employee.goalProgress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>{employee.lastReview}</TableCell>
                        <TableCell>{employee.nextReview}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(employee.status)}>
                            {employee.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="goals" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  KPIs and Goals Tracking
                </CardTitle>
                <CardDescription>Set and monitor employee goals and key performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Create New Goal</h4>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="goalTitle">Goal Title</Label>
                        <Input id="goalTitle" placeholder="Enter goal title" />
                      </div>
                      <div>
                        <Label htmlFor="goalDescription">Description</Label>
                        <Textarea id="goalDescription" placeholder="Goal description" />
                      </div>
                      <div>
                        <Label htmlFor="deadline">Deadline</Label>
                        <Input id="deadline" type="date" />
                      </div>
                      <Button className="w-full">Create Goal</Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Active Goals</h4>
                    <div className="space-y-3">
                      {goals.map((goal) => (
                        <div key={goal.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium">{goal.title}</h5>
                            <span className="text-sm text-gray-500">{goal.progress}%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-200 rounded mb-2">
                            <div 
                              className="h-full bg-green-500 rounded" 
                              style={{ width: `${goal.progress}%` }}
                            ></div>
                          </div>
                          <p className="text-sm text-gray-600">Due: {goal.deadline}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Self & Peer Reviews</CardTitle>
                <CardDescription>Manage performance review cycles and evaluations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <h4 className="font-medium mb-2">Self Reviews</h4>
                    <div className="text-2xl font-bold text-blue-600">45</div>
                    <p className="text-sm text-gray-600">Completed this quarter</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <h4 className="font-medium mb-2">Peer Reviews</h4>
                    <div className="text-2xl font-bold text-green-600">32</div>
                    <p className="text-sm text-gray-600">Completed this quarter</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <h4 className="font-medium mb-2">Manager Reviews</h4>
                    <div className="text-2xl font-bold text-purple-600">38</div>
                    <p className="text-sm text-gray-600">Completed this quarter</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Upcoming Reviews</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h5 className="font-medium">John Smith - Q2 Review</h5>
                        <p className="text-sm text-gray-600">Self + Manager review due July 15</p>
                      </div>
                      <Button size="sm">Start Review</Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h5 className="font-medium">Sarah Johnson - Mid-year Review</h5>
                        <p className="text-sm text-gray-600">360° review due July 20</p>
                      </div>
                      <Button size="sm">Start Review</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Feedback and Comments
                </CardTitle>
                <CardDescription>Continuous feedback and performance comments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Give Feedback</h4>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="employee">Employee</Label>
                        <Input id="employee" placeholder="Select employee" />
                      </div>
                      <div>
                        <Label htmlFor="feedbackType">Feedback Type</Label>
                        <Input id="feedbackType" placeholder="Positive/Constructive" />
                      </div>
                      <div>
                        <Label htmlFor="comments">Comments</Label>
                        <Textarea id="comments" placeholder="Enter your feedback" />
                      </div>
                      <Button className="w-full">Submit Feedback</Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Recent Feedback</h4>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-green-600">Positive</Badge>
                          <span className="text-sm text-gray-500">2 days ago</span>
                        </div>
                        <p className="text-sm">"Great work on the client presentation. Very well prepared and delivered."</p>
                        <p className="text-xs text-gray-500 mt-1">To: John Smith</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-blue-600">Constructive</Badge>
                          <span className="text-sm text-gray-500">1 week ago</span>
                        </div>
                        <p className="text-sm">"Consider improving documentation practices for better team collaboration."</p>
                        <p className="text-xs text-gray-500 mt-1">To: Mike Chen</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance History</CardTitle>
                <CardDescription>Historical performance data and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Q1 2024 Performance Review</h4>
                      <p className="text-sm text-gray-600">Completed March 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Average: 4.3/5.0</p>
                      <p className="text-sm text-gray-600">89% goal completion</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Q4 2023 Performance Review</h4>
                      <p className="text-sm text-gray-600">Completed December 2023</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Average: 4.1/5.0</p>
                      <p className="text-sm text-gray-600">85% goal completion</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Q3 2023 Performance Review</h4>
                      <p className="text-sm text-gray-600">Completed September 2023</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Average: 3.9/5.0</p>
                      <p className="text-sm text-gray-600">82% goal completion</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;
