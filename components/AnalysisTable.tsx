import {
  getAllAnalysis,
  getCurrentAnalysis,
} from "@/lib/actions/analysis.actions";
import { DataTable } from "./DataTable";
import { columns } from "@/lib/tables/columns";

const AnalysisTable = async () => {
  const { data } = await getAllAnalysis();
  const currentAnalysis = await getCurrentAnalysis();

  return (
    <DataTable
      columns={columns}
      data={data}
      currentId={currentAnalysis?.data?._id ?? ""}
    />
  );
};

export default AnalysisTable;
