export type bookFilters = {
    minPrice?: number;
    maxPrice?: number;
    category?: string;
    search?: string
}

export type bookOptions = {
    size?: number;
    page?: number;
    sortBy?: number;
    sortOrder?: "asc" | "desc"
}