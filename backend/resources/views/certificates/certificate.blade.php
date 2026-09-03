<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        @page { margin: 22mm; }
        body { font-family: DejaVu Sans, sans-serif; color: #1f2937; }
        .certificate { border: 4px solid #4f46e5; padding: 26px 34px; min-height: 145mm; text-align: center; }
        h1 { color: #3730a3; font-size: 30px; letter-spacing: 3px; margin: 0 0 22px; }
        .label { color: #6b7280; font-size: 12px; margin: 12px 0 4px; text-transform: uppercase; }
        .value { font-size: 20px; font-weight: bold; margin: 0; }
        table { width: 100%; border-collapse: collapse; margin-top: 26px; text-align: left; }
        th { background: #eef2ff; color: #3730a3; }
        th, td { border: 1px solid #c7d2fe; padding: 9px 12px; }
        .date { margin-top: 24px; color: #4b5563; font-size: 12px; }
    </style>
</head>
<body>
    <div class="certificate">
        <h1>CERTIFICATE</h1>
        <p class="label">Student</p>
        <p class="value">{{ $enrollment->student->name }}</p>
        <p class="label">Course</p>
        <p class="value">{{ $enrollment->course->name }}</p>
        <table>
            <thead><tr><th>Subject</th><th>Grade</th></tr></thead>
            <tbody>
                @foreach ($subjects as $subject)
                    <tr><td>{{ $subject->name }}</td><td>{{ $grades[$subject->id] }}</td></tr>
                @endforeach
            </tbody>
        </table>
        <p class="date">Certificate date: {{ $certificateDate->format('d M Y') }}</p>
    </div>
</body>
</html>
