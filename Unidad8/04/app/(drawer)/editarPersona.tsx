import { useLocalSearchParams } from "expo-router";
import { EditarInsertarPersonasView } from "../../src/Presentation/Views/EditarInsertarPersonasView";

export default function Page() {
    const params = useLocalSearchParams();
    
    // Recuperamos la persona de los parámetros URL y la parseamos
    const persona = params.persona ? JSON.parse(params.persona as string) : undefined;
    
    // Pasamos la persona como una prop clara
    return <EditarInsertarPersonasView personaInicial={persona} />;
}