import { useLocalSearchParams } from "expo-router";
import { EditarInsertarDepartamentosView } from "../../src/Presentation/Views/EditarInsertarDepartamentosView";

export default function Page() {
    const params = useLocalSearchParams();
    const depto = params.depto ? JSON.parse(params.depto as string) : undefined;
    return <EditarInsertarDepartamentosView deptoInicial={depto} />;
}