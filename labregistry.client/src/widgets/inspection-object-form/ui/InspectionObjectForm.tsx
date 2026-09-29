import { useState } from "react";

import { Button } from "../../../shared/ui/Button";
import { Input } from "../../../shared/ui/Input";
import { Select } from "../../../shared/ui/Select";

import type {
  ProductType,
} from "../../../entities/inspection-object/model/types";

interface Props {
  onSubmit: (
    name: string,
    version: string,
    productType: ProductType,
    receiptDate: string,
    comment: string
  ) => Promise<void>;

  onCancel: () => void;
}

export function InspectionObjectForm({
  onSubmit,
  onCancel,
}: Props) {
  const [name, setName] = useState("");
  const [version, setVersion] = useState("");
  const [productType, setProductType] =
    useState<ProductType>("ПО (Программное обеспечение)");
  const [receiptDate, setReceiptDate] =
    useState("");
  const [comment, setComment] = useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  async function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    try {
      setIsSubmitting(true);

      await onSubmit(
        name,
        version,
        productType,
        receiptDate,
        comment
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
    >
      <div className="form-field">
        <label>Название</label>

        <Input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
          maxLength={200}
        />
      </div>

      <div className="form-field">
        <label>Версия</label>

        <Input
          value={version}
          onChange={(e) =>
            setVersion(e.target.value)
          }
          required
          maxLength={50}
        />
      </div>

      <div className="form-field">
        <label>Тип</label>

        <Select
          value={productType}
          onChange={(e) =>
            setProductType(
              e.target.value as ProductType
            )
          }
        >
          <option value="ПО (Программное обеспечение)">ПО (Программное обеспечение)</option>
          <option value="ПАК (Программно-аппаратный комплекс)">ПАК (Программно-аппаратный комплекс)</option>
        </Select>
      </div>

      <div className="form-field">
        <label>Дата получения</label>

        <Input
          type="date"
          value={receiptDate}
          onChange={(e) =>
            setReceiptDate(e.target.value)
          }
          required
        />
      </div>

      <div className="form-field">
        <label>Комментарий</label>

        <textarea
          className="textarea"
          value={comment}
          maxLength={1000}
          onChange={(e) =>
            setComment(e.target.value)
          }
        />
      </div>

      <div className="form-actions">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Отмена
        </Button>

        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Создание..."
            : "Создать"}
        </Button>
      </div>
    </form>
  );
}