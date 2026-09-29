import { Input } from "../../../shared/ui/Input";
import { Select } from "../../../shared/ui/Select";
import { Button } from "../../../shared/ui/Button";
import type {
  ProductResult,
  ProductType,
} from "../../../entities/inspection-object/model/types";

interface Props {
  namePart: string;
  productType: ProductType | "";
  productResult: ProductResult | "";

  onNameChange: (value: string) => void;
  onProductTypeChange: (value: ProductType | "") => void;
  onProductResultChange: (value: ProductResult | "") => void;

  onSearch: () => void;
}

export function InspectionObjectFilters({
  namePart,
  productType,
  productResult,
  onNameChange,
  onProductTypeChange,
  onProductResultChange,
  onSearch,
}: Props) {
  return (
    <div className="filters">
      <div className="filter-group filter-name">
        <label>Название</label>

        <Input
          value={namePart}
          placeholder="Поиск по названию"
          onChange={(event) =>
            onNameChange(event.target.value)
          }
        />
      </div>

      <div className="filter-group">
        <label>Тип</label>

        <Select
          value={productType}
          onChange={(event) =>
            onProductTypeChange(
              event.target.value as ProductType | ""
            )
          }
        >
          <option value="">Все</option>
          <option value="ПО (Программное обеспечение)">ПО (Программное обеспечение)</option>
          <option value="ПАК (Программно-аппаратный комплекс)">ПАК (Программно-аппаратный комплекс)</option>
        </Select>
      </div>

      <div className="filter-group">
        <label>Результат</label>

        <Select
          value={productResult}
          onChange={(event) =>
            onProductResultChange(
              event.target.value as ProductResult | ""
            )
          }
        >
          <option value="">Все</option>
          <option value="В работе">В работе</option>
          <option value="Соответствует">
            Соответствует
          </option>
          <option value="Не соответствует">
            Не соответствует
          </option>
        </Select>
      </div>

      <Button onClick={onSearch}>
        Найти
      </Button>
    </div>
  );
}