import type { InspectionObject } from "../../../entities/inspection-object/model/types";
import { ResultBadge } from "../../../entities/inspection-object/ui/ResultBadge";

interface Props {
  objects: InspectionObject[];
  onSelect: (object: InspectionObject) => void;
}

export function InspectionObjectTable({
  objects,
  onSelect,
}: Props) {
  if (objects.length === 0) {
    return (
      <div className="empty-state">
        Объекты проверки не найдены.
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="inspection-table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Версия</th>
            <th>Тип</th>
            <th>Дата получения</th>
            <th>Результат</th>
            <th>Комментарий</th>
          </tr>
        </thead>

        <tbody>
          {objects.map((object) => (
            <tr
              key={object.id}
              onClick={() => onSelect(object)}
            >
              <td>{object.name}</td>

              <td>{object.version}</td>

              <td>{object.productType}</td>

              <td>
                {new Date(
                  object.receiptDate
                ).toLocaleDateString("ru-RU")}
              </td>

              <td>
                <ResultBadge
                  result={object.productResult}
                />
              </td>

              <td>
                {object.comment || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}