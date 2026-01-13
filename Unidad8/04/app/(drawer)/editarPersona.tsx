import EditarInsertarPersonasView from "@/src/Presentation/Views/EditarInsertarPersonasView";

export default function EditarPersonaPage({ searchParams }: { searchParams?: { id?: string } }) {
  return <EditarInsertarPersonasView personaId={searchParams?.id} />;
}
