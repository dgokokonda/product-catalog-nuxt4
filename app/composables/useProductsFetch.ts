import type { Product, ProductsResponse } from "~/types/product";
import { API } from "@/constants/api";

export const useProductsFetch = () => {
  const buildApiUrl = (pageNum: number, limit: number): string => {
    const url = new URL(`${API.BASE_URL}${API.PRODUCTS}`);
    url.searchParams.append("page", pageNum.toString());
    url.searchParams.append("limit", limit.toString());
    return url.toString();
  };

  const paginateMock = (
    allProducts: Product[],
    pageNum: number,
    limit: number,
  ): ProductsResponse => {
    const total = allProducts.length;
    const totalPages = Math.ceil(total / limit);
    const start = (pageNum - 1) * limit;
    const end = Math.min(start + limit, total);
    return {
      currentPage: pageNum,
      limit,
      products: allProducts.slice(start, end),
      total,
      totalPages,
    };
  };

  interface SSRResult {
    data: ProductsResponse | null;
    error: unknown;
  }

  const fetchProductsSSR = async (
    pageNum: number,
    limit: number,
  ): Promise<SSRResult> => {
    if (API.USE_MOCK_API) {
      try {
        const mock = (await import("~/mocks/products.json")).default as {
          products: Product[];
        };
        return { data: paginateMock(mock.products, pageNum, limit), error: null };
      } catch (err) {
        console.error("Mock SSR fetch error:", err);
        throw err;
      }
    }

    const url = buildApiUrl(pageNum, limit);

    try {
      const { data, error } = await useFetch<ProductsResponse>(url, {
        key: `products-${pageNum}-${limit}`,
        server: true,
        lazy: false,
      });

      if (error.value) {
        throw error.value;
      }

      return {
        data: data.value || null,
        error: error.value,
      };
    } catch (err) {
      console.error("SSR fetch error:", err);
      throw err;
    }
  };

  const fetchProductsClient = async (
    pageNum: number,
    limit: number,
  ): Promise<ProductsResponse> => {
    if (API.USE_MOCK_API) {
      const mock = (await import("~/mocks/products.json")).default as {
        products: Product[];
      };
      return paginateMock(mock.products, pageNum, limit);
    }

    const url = buildApiUrl(pageNum, limit);
    return await $fetch<ProductsResponse>(url);
  };

  return {
    fetchProductsSSR,
    fetchProductsClient,
  };
};
