export class ApiError extends Error {
  public readonly statusCode: number;

  constructor(
    statusCode: number,
    message: string
  ) {
    super(message);

    this.name = "ApiError";
    this.statusCode = statusCode;
  }
}

async function extractErrorMessage(
  response: Response
): Promise<string> {
  try {
    const errors = await response.json();

    if (Array.isArray(errors)) {
      const messages = errors
        .filter(
          (x) =>
            x &&
            typeof x.errorMessage === "string" &&
            x.errorMessage.trim() !== ""
        )
        .map((x) => x.errorMessage);

      if (messages.length > 0) {
        return messages.join("\n");
      }
    }
  } catch {
    // Ignore invalid error response.
  }

  switch (response.status) {
    case 400:
      return "Некорректные данные запроса.";

    case 404:
      return "Объект не найден.";

    case 409:
      return "Конфликт данных.";

    case 503:
      return "Сервис временно недоступен.";

    default:
      return `Сервер вернул ошибку ${response.status}.`;
  }
}

export async function apiRequest<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const message = await extractErrorMessage(response);

    throw new ApiError(response.status, message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}