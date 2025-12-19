async function getSubmissions() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/admin/submissions`,
    {
      credentials: 'include',
      cache: 'no-store',
    }
  );

  if (!res.ok) throw new Error('Unauthorized');

  return res.json();
}

export default async function SubmissionsPage() {
  const submissions = await getSubmissions();

  return (
    <div>
      <h1>Form Submissions</h1>

      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {submissions.map((s: any) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.message}</td>
              <td>{new Date(s.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
