import EditStudentClient from "./EditStudentClient";

type EditStudentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditStudentPage({ params }: EditStudentPageProps) {
  const { id } = await params;

  return <EditStudentClient id={Number(id)} />;
}
