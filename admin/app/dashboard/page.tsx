"use client";

import { useEffect, useRef, useState } from 'react';
import type ApexCharts from 'apexcharts';
import type {
  ApexAxisChartSeries,
  ApexChart,
  ApexNonAxisChartSeries,
  ApexOptions,
} from 'apexcharts';
import { Users, BookOpen, CreditCard, TrendingUp, type LucideIcon } from 'lucide-react';
import { fetchAdminDashboard } from '../lib/api/dashboard';

type Stat = {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  bg: string;
};

type ChartProps = {
  options: ApexOptions;
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  type: ApexChart['type'];
  height?: number;
};

const chartCardClass = 'bg-white p-6 rounded-xl shadow-sm border border-gray-100';

function DashboardChart({ options, series, type, height = 320 }: ChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chartElement = chartRef.current;
    let chart: ApexCharts | null = null;
    let isCancelled = false;

    async function renderChart() {
      if (!chartElement) return;

      const ApexCharts = (await import('apexcharts')).default;

      if (isCancelled) return;

      chartElement.innerHTML = '';
      chart = new ApexCharts(chartElement, {
        ...options,
        series,
        chart: {
          ...options.chart,
          type,
          height,
          toolbar: {
            show: false,
          },
        },
      });

      chart.render();
    }

    renderChart();

    return () => {
      isCancelled = true;
      chart?.destroy();
      if (chartElement) {
        chartElement.innerHTML = '';
      }
    };
  }, [height, options, series, type]);

  return <div ref={chartRef} />;
}

const lineChartOptions: ApexOptions = {
  colors: ['#2563eb'],
  stroke: {
    curve: 'smooth',
    width: 3,
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    borderColor: '#e5e7eb',
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    labels: {
      style: {
        colors: '#6b7280',
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: '#6b7280',
      },
    },
  },
};

const lineChartSeries: ApexAxisChartSeries = [
  {
    name: 'Enrollments',
    data: [28, 34, 42, 38, 51, 64],
  },
];

const pieChartOptions: ApexOptions = {
  colors: ['#2563eb', '#16a34a', '#f59e0b', '#dc2626'],
  labels: ['Web Design', 'Office Package', 'Graphic Design', 'Accounting'],
  legend: {
    position: 'bottom',
    labels: {
      colors: '#4b5563',
    },
  },
  dataLabels: {
    enabled: true,
  },
};

const pieChartSeries: ApexNonAxisChartSeries = [36, 28, 22, 14];

const barChartOptions: ApexOptions = {
  colors: ['#16a34a'],
  plotOptions: {
    bar: {
      borderRadius: 4,
      columnWidth: '48%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    borderColor: '#e5e7eb',
  },
  xaxis: {
    categories: ['Web', 'Office', 'Graphics', 'Tally', 'Basic'],
    labels: {
      style: {
        colors: '#6b7280',
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: '#6b7280',
      },
    },
  },
};

const barChartSeries: ApexAxisChartSeries = [
  {
    name: 'Revenue',
    data: [4200, 3100, 2700, 2200, 1800],
  },
];

export default function AdminPage() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminDashboard()
      .then((data) => {
        setStats([
          {
            label: 'Total Students',
            value: data.totalStudents,
            icon: Users,
            color: 'text-blue-600',
            bg: 'bg-blue-100',
          },
          {
            label: 'Active Courses',
            value: data.activeCourses,
            icon: BookOpen,
            color: 'text-green-600',
            bg: 'bg-green-100',
          },
          {
            label: 'Total Revenue',
            value: `$${data.revenue}`,
            icon: CreditCard,
            color: 'text-purple-600',
            bg: 'bg-purple-100',
          },
          {
            label: 'Enrollments (MTD)',
            value: `${data.enrollments}%`,
            icon: TrendingUp,
            color: 'text-orange-600',
            bg: 'bg-orange-100',
          },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading admin dashboard...</p>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Overview</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  {stat.label}
                </p>
                <h3 className="text-2xl font-bold mt-1 text-gray-800">
                  {stat.value}
                </h3>
              </div>
              <div className={`${stat.bg} p-3 rounded-lg`}>
                <stat.icon className={`${stat.color} w-6 h-6`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        <div className={`${chartCardClass} xl:col-span-2`}>
          <div className="mb-4">
            <h3 className="font-bold text-gray-800">Enrollment Trend</h3>
            <p className="text-sm text-gray-500">Monthly student growth</p>
          </div>
          <DashboardChart
            options={barChartOptions}
            series={barChartSeries}
            type="bar"
          />
        
        </div>

        <div className={chartCardClass}>
          <div className="mb-4">
            <h3 className="font-bold text-gray-800">Course Mix</h3>
            <p className="text-sm text-gray-500">Enrollments by course</p>
          </div>
          <DashboardChart
            options={pieChartOptions}
            series={pieChartSeries}
            type="pie"
          />
        </div>

        <div className={`${chartCardClass} xl:col-span-3`}>
          <div className="mb-4">
            <h3 className="font-bold text-gray-800">Revenue by Course</h3>
            <p className="text-sm text-gray-500">Top performing categories</p>
          </div>
          <DashboardChart
            options={lineChartOptions}
            series={lineChartSeries}
            type="line"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="font-bold text-gray-800">Recent Enrollments</h3>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="p-4 font-semibold">Student</th>
              <th className="p-4 font-semibold">Course</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-4 text-sm font-medium text-gray-700">
                  Student {i + 1}
                </td>
                <td className="p-4 text-sm text-gray-600">
                  Next.js for Beginners
                </td>
                <td className="p-4 text-sm text-gray-500">
                  Oct 24, 2023
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    Paid
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
