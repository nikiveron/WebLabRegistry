import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  getInspectionObjects,
} from "../../../entities/inspection-object/api/inspectionObjectApi";

import type {
  InspectionObject,
  ProductResult,
  ProductType,
} from "../../../entities/inspection-object/model/types";

import { InspectionObjectFilters } from "../../../widgets/inspection-object-filters/ui/InspectionObjectFilters";
import { InspectionObjectTable } from "../../../widgets/inspection-object-table/ui/InspectionObjectTable";
import { Pagination } from "../../../widgets/pagination/ui/Pagination";

import { CreateInspectionObject } from "../../../features/create-inspection-object/ui/CreateInspectionObject";
import { UpdateInspectionObject } from "../../../features/update-inspection-object/ui/UpdateInspectionObject";

export function InspectionObjectsPage() {
  const [objects, setObjects] = useState<InspectionObject[]>([]);

  const [namePart, setNamePart] = useState("");
  const [productType, setProductType] =
    useState<ProductType | "">("");
  const [productResult, setProductResult] =
    useState<ProductResult | "">("");

  const [appliedNamePart, setAppliedNamePart] =
    useState("");

  const [appliedProductType, setAppliedProductType] =
    useState<ProductType | "">("");

  const [appliedProductResult, setAppliedProductResult] =
    useState<ProductResult | "">("");

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [totalPages, setTotalPages] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedObject, setSelectedObject] =
    useState<InspectionObject | null>(null);

  const [reloadKey, setReloadKey] = useState(0);

  const loadObjects = useCallback(
    async (signal: AbortSignal) => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await getInspectionObjects(
          {
            namePart: appliedNamePart || undefined,
            productType: appliedProductType || undefined,
            productResult: appliedProductResult || undefined,
            page,
            pageSize,
          },
          signal
        );

        setObjects(response.inspectionObjects);
        setTotalPages(response.totalPages);
      } catch (error) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        setError(
          error instanceof Error
            ? error.message
            : "Не удалось загрузить объекты."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [
      appliedNamePart,
      appliedProductType,
      appliedProductResult,
      page,
      pageSize,
    ]
  );

  useEffect(() => {
    const controller = new AbortController();

    void loadObjects(controller.signal);

    return () => {
      controller.abort();
    };
  }, [loadObjects, reloadKey]);

  function handleSearch() {
    setAppliedNamePart(namePart);
    setAppliedProductType(productType);
    setAppliedProductResult(productResult); 

    setPage(1);
  }

  function handlePageChange(newPage: number) {
    setPage(newPage);
  }

  function handleCreated() {
    setPage(1);
    setReloadKey((value) => value + 1);
  }

  function handleUpdated() {
    setReloadKey((value) => value + 1);
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1>LabRegistry</h1>

          <p>
            Объекты проверки
          </p>
        </div>

        <CreateInspectionObject
          onCreated={handleCreated}
        />
      </header>

      <section className="card">
        <InspectionObjectFilters
          namePart={namePart}
          productType={productType}
          productResult={productResult}
          onNameChange={setNamePart}
          onProductTypeChange={setProductType}
          onProductResultChange={setProductResult}
          onSearch={handleSearch}
        />
      </section>

      {error && (
        <div className="error-message page-error">
          {error}
        </div>
      )}

      <section className="card">
        {isLoading ? (
          <div className="loading">
            Загрузка...
          </div>
        ) : (
          <InspectionObjectTable
            objects={objects}
            onSelect={setSelectedObject}
          />
        )}
      </section>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {selectedObject && (
        <UpdateInspectionObject
          object={selectedObject}
          onUpdated={handleUpdated}
          onClose={() => setSelectedObject(null)}
        />
      )}
    </div>
  );
}