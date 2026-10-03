import { DashboardLayout } from "../components/home/DashboardLayout";
import { MyDesigns } from "../components/home/MyDesigns";
import { useHome } from "../components/home/useHome";

export default function MisDiseñosPage() {
  const { designs, openEditor, openNewDesign } = useHome();

  return <DashboardLayout>
    <MyDesigns designs={designs} onOpenDesign={openEditor} onNewDesign={openNewDesign} />
  </DashboardLayout>;
}
