export type ProductType = "ПО (Программное обеспечение)" | "ПАК (Программно-аппаратный комплекс)";

export type ProductResult =
  | "В работе"
  | "Соответствует"
  | "Не соответствует";

export interface InspectionObject {
  id: string;
  name: string;
  version: string;
  productType: ProductType;
  receiptDate: string;
  productResult: ProductResult;
  comment: string | null;
}

export interface GetInspectionObjectsListResponse {
  inspectionObjects: InspectionObject[];
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

export interface CreateInspectionObjectRequest {
  name: string;
  version: string;
  productType: ProductType;
  recieptDate: string;
  comment?: string | null;
}

export interface UpdateInspectionObjectRequest {
  productResult?: ProductResult | null;
  comment?: string | null;
}

export interface ApiErrorResponse {
  key: string;
  errorMessage: string;
}