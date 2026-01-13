import EditarInsertarDepartamentosView from "@/src/Presentation/Views/EditarInsertarDepartamentosView";

export default function EditarDeptoPage({ searchParams }: { searchParams?: { id?: string } }) {
  return <EditarInsertarDepartamentosView departamentoId={searchParams?.id} />;
}
