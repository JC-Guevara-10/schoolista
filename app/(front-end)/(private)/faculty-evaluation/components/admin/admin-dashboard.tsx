'use client'
import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  Download,
  Filter,
  GraduationCap,
  TrendingUp,
  Users,
  BookOpen,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data for the dashboard
const categoryAverages = [
  { category: "Teaching Effectiveness", average: 4.2, responses: 145 },
  { category: "Clarity of Instruction", average: 4.5, responses: 145 },
  { category: "Engagement & Interaction", average: 4.1, responses: 145 },
  { category: "Timeliness of Feedback", average: 3.8, responses: 145 },
  { category: "Professionalism", average: 4.7, responses: 145 },
];

const radarData = [
  { subject: "Teaching", value: 4.2, fullMark: 5 },
  { subject: "Clarity", value: 4.5, fullMark: 5 },
  { subject: "Engagement", value: 4.1, fullMark: 5 },
  { subject: "Feedback", value: 3.8, fullMark: 5 },
  { subject: "Professional", value: 4.7, fullMark: 5 },
];

const trendData = [
  { term: "Fall 2025", score: 4.0 },
  { term: "Winter 2025", score: 4.1 },
  { term: "Spring 2026", score: 4.3 },
];

const instructorData = [
  {
    id: 1,
    name: "Dr. Sarah Mitchell",
    course: "CS 101",
    responses: 48,
    avgScore: 4.5,
    trend: "up",
  },
  {
    id: 2,
    name: "Prof. James Rodriguez",
    course: "MATH 201",
    responses: 52,
    avgScore: 4.2,
    trend: "up",
  },
  {
    id: 3,
    name: "Dr. Emily Chen",
    course: "ENG 102",
    responses: 45,
    avgScore: 4.6,
    trend: "stable",
  },
];

const questionBreakdown = [
  { question: "Q1: Subject Knowledge", score: 4.5 },
  { question: "Q2: Organization", score: 4.3 },
  { question: "Q3: Clear Communication", score: 4.6 },
  { question: "Q4: Clear Instructions", score: 4.4 },
  { question: "Q5: Enthusiasm", score: 4.2 },
  { question: "Q6: Encourages Participation", score: 4.0 },
  { question: "Q7: Timely Feedback", score: 3.8 },
  { question: "Q8: Availability", score: 3.8 },
  { question: "Q9: Respect & Fairness", score: 4.7 },
  { question: "Q10: Professional Boundaries", score: 4.6 },
];

export default function AdminDashboard() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>("all");
  const [selectedInstructor, setSelectedInstructor] = useState<string | null>(
    "all",
  );
  const [selectedTerm, setSelectedTerm] = useState<string | null>("spring2026");

  const overallAverage = 4.3;
  const totalResponses = 145;
  const responseRate = 87;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-yellow-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="bg-primary p-2 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-primary">
                    Admin Dashboard
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Faculty Evaluation Analytics
                  </p>
                </div>
              </div>
            </div>
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            <div className="flex flex-wrap gap-3 flex-1">
              <Select
                value={selectedTerm}
                onValueChange={(value) => setSelectedTerm(value ?? "all")}
              >
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spring2026">Spring 2026</SelectItem>
                  <SelectItem value="winter2025">Winter 2025</SelectItem>
                  <SelectItem value="fall2025">Fall 2025</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={selectedInstructor}
                onValueChange={(value) => setSelectedInstructor(value ?? "all")}
              >
                <SelectTrigger className="w-50">
                  <SelectValue placeholder="All Instructors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Instructors</SelectItem>
                  <SelectItem value="mitchell">Dr. Sarah Mitchell</SelectItem>
                  <SelectItem value="rodriguez">
                    Prof. James Rodriguez
                  </SelectItem>
                  <SelectItem value="chen">Dr. Emily Chen</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={selectedCourse}
                onValueChange={(value) => setSelectedCourse(value ?? "all")}
              >
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="All Courses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="cs101">CS 101</SelectItem>
                  <SelectItem value="math201">MATH 201</SelectItem>
                  <SelectItem value="eng102">ENG 102</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card className="border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Overall Average
                    </p>
                    <p className="text-3xl font-semibold text-primary">
                      {overallAverage}
                    </p>
                    <p className="text-xs text-muted-foreground">out of 5.0</p>
                  </div>
                  <div className="bg-primary/10 p-3 rounded-full">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Total Responses
                    </p>
                    <p className="text-3xl font-semibold">{totalResponses}</p>
                    <p className="text-xs text-muted-foreground">evaluations</p>
                  </div>
                  <div className="bg-secondary/20 p-3 rounded-full">
                    <Users className="h-5 w-5 text-secondary-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Response Rate
                    </p>
                    <p className="text-3xl font-semibold">{responseRate}%</p>
                    <p className="text-xs text-green-600">+5% from last term</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Courses Evaluated
                    </p>
                    <p className="text-3xl font-semibold">3</p>
                    <p className="text-xs text-muted-foreground">
                      active courses
                    </p>
                  </div>
                  <div className="bg-muted p-3 rounded-full">
                    <BookOpen className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Charts */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="instructors">Instructors</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Category Averages */}
                <Card>
                  <CardHeader>
                    <CardTitle>Category Averages</CardTitle>
                    <CardDescription>
                      Average scores by evaluation category
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={categoryAverages}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis
                          dataKey="category"
                          angle={-45}
                          textAnchor="end"
                          height={120}
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis domain={[0, 5]} />
                        <Tooltip />
                        <Bar
                          dataKey="average"
                          fill="#1e40af"
                          radius={[8, 8, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Radar Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Radar</CardTitle>
                    <CardDescription>
                      Overall performance across all categories
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="#e5e7eb" />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis domain={[0, 5]} />
                        <Radar
                          name="Score"
                          dataKey="value"
                          stroke="#1e40af"
                          fill="#1e40af"
                          fillOpacity={0.6}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Question Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Question-by-Question Analysis</CardTitle>
                  <CardDescription>
                    Detailed scores for each evaluation question
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={questionBreakdown} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis type="number" domain={[0, 5]} />
                      <YAxis
                        dataKey="question"
                        type="category"
                        width={200}
                        tick={{ fontSize: 12 }}
                      />
                      <Tooltip />
                      <Bar
                        dataKey="score"
                        fill="#fbbf24"
                        radius={[0, 8, 8, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="instructors" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Instructor Performance</CardTitle>
                  <CardDescription>
                    Individual instructor evaluation results
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {instructorData.map((instructor) => (
                      <div
                        key={instructor.id}
                        className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-3">
                            <h4 className="font-semibold">{instructor.name}</h4>
                            <Badge variant="outline">{instructor.course}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {instructor.responses} responses
                          </p>
                        </div>
                        <div className="flex items-center gap-6 mt-3 md:mt-0">
                          <div className="text-right">
                            <p className="text-2xl font-semibold text-primary">
                              {instructor.avgScore}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Average Score
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {instructor.trend === "up" && (
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            )}
                            <span className="text-sm text-green-600">
                              {instructor.trend === "up" ? "+0.3" : "—"}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Trend Analysis</CardTitle>
                  <CardDescription>
                    Performance trends over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="term" />
                      <YAxis domain={[0, 5]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#1e40af"
                        strokeWidth={3}
                        dot={{ fill: "#1e40af", r: 6 }}
                        name="Average Score"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Insights */}
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-900">Key Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-blue-800">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>
                        Overall scores have improved by 0.3 points since Fall
                        2025
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>
                        &quot;Professionalism&quot; consistently receives the
                        highest ratings (4.7)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>
                        &quot;Timeliness of Feedback&quot; shows room for
                        improvement (3.8)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5">•</span>
                      <span>Response rate increased by 5% this term</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
