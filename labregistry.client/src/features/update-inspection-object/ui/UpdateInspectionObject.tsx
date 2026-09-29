import { useState } from "react";

import { Button } from "../../../shared/ui/Button";
import { Select } from "../../../shared/ui/Select";

import {
  updateInspectionObject,
} from "../../../entities/inspection-object/api/inspectionObjectApi";

import type {
  InspectionObject,
  ProductResult,
} from "../../../entities/inspection-object/model/types";

interface Props {
  object: InspectionObject;
  onUpdated: () => void;
  onClose: () => void;
}

export function UpdateInspectionObject({
  object,
  onUpdated,
  onClose,
}: Props) {
  const [productResult, setProductResult] =
    useState<ProductResult>(
      object.productResult
    );

  const [comment, setComment] =
    useState(object.comment ?? "");

  const [isSaving, setIsSaving] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  async function handleSave() {
    try {
      setIsSaving(true);
      setError(null);

      await updateInspectionObject(
        object.id,
        {
          productResult,
          comment: comment || null,
        }
      );

      onUpdated();
      onClose();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Не удалось обновить объект."
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Обновление объекта</h2>

          <button
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="object-details">
          <div>
            <strong>Название:</strong>{" "}
            {object.name}
          </div>

          <div>
            <strong>Версия:</strong>{" "}
            {object.version}
          </div>

          <div>
            <strong>Тип:</strong>{" "}
            {object.productType}
          </div>

          <div>
            <strong>Дата получения:</strong>{" "}
            {new Date(
              object.receiptDate
            ).toLocaleDateString("ru-RU")}
          </div>
        </div>

        <div className="form-field">
          <label>Результат</label>

          <Select
            value={productResult}
            onChange={(e) =>
              setProductResult(
                e.target.value as ProductResult
              )
            }
          >
            <option value="В работе">
              В работе
            </option>

            <option value="Соответствует">
              Соответствует
            </option>

            <option value="Не соответствует">
              Не соответствует
            </option>
          </Select>
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
            variant="secondary"
            onClick={onClose}
            disabled={isSaving}
          >
            Отмена
          </Button>

          <Button
            onClick={handleSave}
            disabled={isSaving}
          >
            {isSaving
              ? "Сохранение..."
              : "Сохранить"}
          </Button>
        </div>
      </div>
    </div>
  );
}