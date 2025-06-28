
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { BarChart3, Target, Star, Calendar, MessageSquare, TrendingUp, Plus, Trash2, Edit, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePerformanceData } from '@/hooks/usePerformanceData';
import ScheduleReviewModal from '@/components/performance/ScheduleReviewModal';
import { useToast } from '@/hooks/use-toast';

const PerformanceAnalytics = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    performanceData,
    goals,
    reviews,
    feedback,
    history,
    stats,
    addGoal,
    updateGoalProgress,
    deleteGoal,
    startReview,
    completeReview,
    scheduleReview,
    addFeedback
  } = usePerformanceData();

  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    employeeId: 'perf1',
    title: '',
    description: '',
    deadline: '',
    category: 'Technical Skills'
  });
  const [newFeedback, setNewFeedback] = useState({
    fromEmployee: 'Manager',
    toEmployee: '',
    type: 'Positive' as const,
    comments: '',
    isAnonymous: false
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Exceeding': return 'bg-green-100 text-green-800';
      case 'On Track': return 'bg-blue-100 text-blue-800';
      case 'Needs Improvement': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Active': return 'bg-blue-100 text-blue-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateGoal = () => {
    if (newGoal.title && newGoal.deadline) {
      addGoal({
        ...newGoal,
        progress: 0,
        status: 'Active'
      });
      setNewGoal({
        employeeId: 'perf1',
        title: '',
        description: '',
        deadline: '',
        category: 'Technical Skills'
      });
      toast({
        title: "Goal Created",
        description: "New performance goal has been created successfully.",
      });
    }
  };

  const handleGoalProgressUpdate = (goalId: string, progress: number) => {
    updateGoalProgress(goalId, progress);
    toast({
      title: "Progress Updated",
      description: "Goal progress has been updated successfully.",
    });
  };

  const handleStartReview = (reviewId: string) => {
    startReview(reviewId);
    toast({
      title: "Review Started",
      description: "Performance review has been started.",
    });
  };

  const handleSubmitFeedback = () => {
    if (newFeedback.toEmployee && newFeedback.comments) {
      addFeedback(newFeedback);
      setNewFeedback({
        fromEmployee: 'Manager',
        toEmployee: '',
        type: 'Positive',
        comments: '',
        isAnonymous: false
      });
      toast({
        title: "Feedback Submitted",
        description: "Feedback has been submitted successfully.",
      });
    }
  };

  const handleScheduleReview = (review: any) => {
    scheduleReview(review);
    toast({
      title: "Review Scheduled",
      description: "Performance review has been scheduled successfully.",
    });
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
            <Button 
              className="bg-red-600 hover:bg-red-700"
              onClick={() => setIsScheduleModalOpen(true)}
            >
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
                  <div className="text-2xl font-bold">{stats.averageScore.toFixed(1)}</div>
                  <p className="text-xs text-muted-foreground">Out of 5.0</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Goals Completed</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.goalCompletionRate.toFixed(0)}%</div>
                  <p className="text-xs text-muted-foreground">This quarter</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Reviews Due</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pendingReviews}</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.topPerformers}</div>
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
                    {performanceData.map((employee) => (
                      <TableRow key={employee.id}>
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
                            <Progress value={employee.goalProgress} className="w-20" />
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
                        <Label htmlFor="goalTitle">Goal Title *</Label>
                        <Input 
                          id="goalTitle" 
                          placeholder="Enter goal title"
                          value={newGoal.title}
                          onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="goalDescription">Description</Label>
                        <Textarea 
                          id="goalDescription" 
                          placeholder="Goal description"
                          value={newGoal.description}
                          onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="deadline">Deadline *</Label>
                        <Input 
                          id="deadline" 
                          type="date"
                          value={newGoal.deadline}
                          onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select value={newGoal.category} onValueChange={(value) => 
                          setNewGoal(prev => ({ ...prev, category: value }))
                        }>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Technical Skills">Technical Skills</SelectItem>
                            <SelectItem value="Leadership">Leadership</SelectItem>
                            <SelectItem value="Quality">Quality</SelectItem>
                            <SelectItem value="Communication">Communication</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleCreateGoal} className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Goal
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Active Goals</h4>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {goals.map((goal) => (
                        <div key={goal.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <h5 className="font-medium">{goal.title}</h5>
                              <p className="text-sm text-gray-600 mb-2">{goal.description}</p>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleGoalProgressUpdate(goal.id, Math.min(100, goal.progress + 10))}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => deleteGoal(goal.id)}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <Progress value={goal.progress} className="flex-1" />
                            <span className="text-sm font-medium">{goal.progress}%</span>
                          </div>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-600">Due: {goal.deadline}</span>
                            <Badge className={getStatusColor(goal.status)}>
                              {goal.status}
                            </Badge>
                          </div>
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
                    <div className="text-2xl font-bold text-blue-600">
                      {reviews.filter(r => r.type === 'Self').length}
                    </div>
                    <p className="text-sm text-gray-600">Total scheduled</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <h4 className="font-medium mb-2">Peer Reviews</h4>
                    <div className="text-2xl font-bold text-green-600">
                      {reviews.filter(r => r.type === 'Peer').length}
                    </div>
                    <p className="text-sm text-gray-600">Total scheduled</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <h4 className="font-medium mb-2">Manager Reviews</h4>
                    <div className="text-2xl font-bold text-purple-600">
                      {reviews.filter(r => r.type === 'Manager').length}
                    </div>
                    <p className="text-sm text-gray-600">Total scheduled</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold">Upcoming Reviews</h4>
                  <div className="space-y-2">
                    {reviews.map((review) => (
                      <div key={review.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h5 className="font-medium">{review.employee} - {review.type} Review</h5>
                          <p className="text-sm text-gray-600">Due: {review.dueDate}</p>
                          <Badge className={getStatusColor(review.status)}>
                            {review.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2">
                          {review.status === 'Pending' && (
                            <Button 
                              size="sm"
                              onClick={() => handleStartReview(review.id)}
                            >
                              Start Review
                            </Button>
                          )}
                          {review.status === 'In Progress' && (
                            <Button 
                              size="sm"
                              variant="outline"
                              onClick={() => completeReview(review.id, 4.2, 'Review completed')}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Complete
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
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
                        <Label htmlFor="employee">Employee *</Label>
                        <Select value={newFeedback.toEmployee} onValueChange={(value) => 
                          setNewFeedback(prev => ({ ...prev, toEmployee: value }))
                        }>
                          <SelectTrigger>
                            <SelectValue placeholder="Select employee" />
                          </SelectTrigger>
                          <SelectContent>
                            {performanceData.map(emp => (
                              <SelectItem key={emp.id} value={emp.employee}>{emp.employee}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="feedbackType">Feedback Type</Label>
                        <Select value={newFeedback.type} onValueChange={(value: any) => 
                          setNewFeedback(prev => ({ ...prev, type: value }))
                        }>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Positive">Positive</SelectItem>
                            <SelectItem value="Constructive">Constructive</SelectItem>
                            <SelectItem value="Recognition">Recognition</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="comments">Comments *</Label>
                        <Textarea 
                          id="comments" 
                          placeholder="Enter your feedback"
                          value={newFeedback.comments}
                          onChange={(e) => setNewFeedback(prev => ({ ...prev, comments: e.target.value }))}
                        />
                      </div>
                      <Button onClick={handleSubmitFeedback} className="w-full">
                        Submit Feedback
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-semibold">Recent Feedback</h4>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {feedback.map((fb) => (
                        <div key={fb.id} className="p-3 border rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className={
                              fb.type === 'Positive' ? 'text-green-600' : 
                              fb.type === 'Constructive' ? 'text-blue-600' : 'text-purple-600'
                            }>
                              {fb.type}
                            </Badge>
                            <span className="text-sm text-gray-500">{fb.date}</span>
                          </div>
                          <p className="text-sm mb-2">"{fb.comments}"</p>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>To: {fb.toEmployee}</span>
                            <span>From: {fb.isAnonymous ? 'Anonymous' : fb.fromEmployee}</span>
                          </div>
                        </div>
                      ))}
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
                  {history.map((record) => (
                    <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{record.period} Performance Review</h4>
                        <p className="text-sm text-gray-600">Completed {record.completedDate}</p>
                        <p className="text-sm text-gray-600">{record.reviewType}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">Average: {record.averageScore}/5.0</p>
                        <p className="text-sm text-gray-600">{record.goalCompletion}% goal completion</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <ScheduleReviewModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSchedule={handleScheduleReview}
      />
    </div>
  );
};

export default PerformanceAnalytics;
