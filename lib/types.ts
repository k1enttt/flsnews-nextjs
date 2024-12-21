export interface MinimalTag {
  slug: string;
  name: string;
}

export interface ErrorReadResponse {
  success: false;
  errors: {
    message: string;
    type: string;
  }[];
}

export interface SuccessReadResponse<T> {
  success: true;
  meta: {
    pagination: {
      pages: number;
      page: number;
      limit: number | "all";
      total: number;
      prev: number | null;
      next: number | null;
    };
  };
  data: T;
}
export interface SuccessAddResponse<T> {
  success: true;
  data: T;
}

export interface ErrorAddResponse {
  success: false;
  errors: {
    message: string;
    type: string;
    context?: string | null | undefined;
  }[];
}

export interface ErrorBrowseResponse {
  success: false;
  errors: {
    message: string;
    type: string;
  }[];
}

export interface SuccessBrowseResponse<T> {
  success: true;
  meta: {
    pagination: {
      pages: number;
      page: number;
      limit: number | "all";
      total: number;
      prev: number | null;
      next: number | null;
    };
  };
  data: T[];
}
