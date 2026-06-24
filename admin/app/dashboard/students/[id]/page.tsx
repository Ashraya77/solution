import StudentDetailsClient from "./StudentDetailsClient";

type StudentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function StudentPage({ params }: StudentPageProps) {
  const { id } = await params;

  return <StudentDetailsClient id={Number(id)} />;
}
