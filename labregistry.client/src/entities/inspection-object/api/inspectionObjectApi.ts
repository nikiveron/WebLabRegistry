import { apiRequest } from "../../../shared/api/httpClient";
import type {
  CreateInspectionObjectRequest,
  GetInspectionObjectsListResponse,
  InspectionObject,
  UpdateInspectionObjectRequest,
  ProductResult,
  ProductType,
} from "../model/types";

export interface InspectionObjectFilters {
  namePart?: string;
  productType?: ProductType;
  productResult?: ProductResult;
  page: number;
  pageSize: number;
}

export async function getInspectionObjects(
  filters: InspectionObjectFilters,
  signal?: AbortSignal,
): Promise<GetInspectionObjectsListResponse> {
  const params = new URLSearchParams();

  params.set("Page", filters.page.toString());
  params.set("PageSize", filters.pageSize.toString());

  if (filters.namePart?.trim()) {
    params.set("NamePart", filters.namePart.trim());
  }

  if (filters.productType) {
    params.set("ProductType", filters.productType);
  }

  if (filters.productResult) {
    params.set("ProductResult", filters.productResult);
  }

  return apiRequest<GetInspectionObjectsListResponse>(
    `/api/inspection-objects?${params.toString()}`,
    {
        signal,
    },
  );
}

export async function getInspectionObjectById(
  id: string
): Promise<InspectionObject> {
  return apiRequest<InspectionObject>(
    `/api/inspection-objects/${id}`
  );
}

export async function createInspectionObject(
  request: CreateInspectionObjectRequest
): Promise<void> {
  await apiRequest<void>("/api/inspection-objects", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

export async function updateInspectionObject(
  id: string,
  request: UpdateInspectionObjectRequest
): Promise<void> {
  await apiRequest<void>(
    `/api/inspection-objects/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify(request),
    }
  );
}