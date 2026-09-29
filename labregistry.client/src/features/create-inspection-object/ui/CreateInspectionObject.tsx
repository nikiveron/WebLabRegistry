import { useState } from "react";

import { Button } from "../../../shared/ui/Button";
import { InspectionObjectForm } from "../../../widgets/inspection-object-form/ui/InspectionObjectForm";
import { createInspectionObject } from "../../../entities/inspection-object/api/inspectionObjectApi";

import type {
  ProductType,
} from "../../../entities/inspection-object/model/types";

interface Props {
  onCreated: () => void;
}

export function CreateInspectionObject({
  onCreated,
}: Props) {
  const [isOpen, setIsOpen] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  async function handleSubmit(
    name: string,
    version: string,
    productType: ProductType,
    receiptDate: string,
    comment: string
  ) {
    try {
      setError(null);

      await createInspectionObject({
        name,
        version,
        productType,
        recieptDate: new Date(
          receiptDate
        ).toISOString(),
        comment: comment || null,
      });

      setIsOpen(false);

      onCreated();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Не удалось создать объект."
      );
    }
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => {
          setError(null);
          setIsOpen(true);
        }}
      >
        + Создать объект
      </Button>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Создание объекта проверки</h2>

          <button
            className="modal-close"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <InspectionObjectForm
          onSubmit={handleSubmit}
          onCancel={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
}