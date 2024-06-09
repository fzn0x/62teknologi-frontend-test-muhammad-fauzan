import hypfRequest from "./config";

export interface FiltersSchema {
  name: string | undefined;
  minRating: number | undefined;
  maxRating: number | undefined;
  minReviewCount: number | undefined;
  maxReviewCount: number | undefined;
}

export async function getBusiness(
  page: number,
  limit: number,
  filter?: FiltersSchema
) {
  const filters = Object.values(filter || {}).some(Boolean)
    ? JSON.stringify(filter)
    : null;
  const encodedFilters = filters ? encodeURIComponent(filters) : null;

  const [getErr, getData] = await hypfRequest.get(
    `/api/business/search?page=${page}&limit=${limit}${
      encodedFilters ? `&filters=${encodedFilters}` : ""
    }`
  );

  if (getErr) {
    throw getErr;
  }

  return getData;
}

export async function getABusiness(id: number) {
  const [getErr, getData] = await hypfRequest.get(`/api/business/${id}`);

  if (getErr) {
    throw getErr;
  }

  return getData;
}

export async function postBusiness(data: unknown) {
  const [postErr, postData] = await hypfRequest.post(`/api/business`, {}, data);

  if (postErr) {
    throw postErr;
  }

  return postData;
}

export async function putBusiness(id: number, data: unknown) {
  const [putErr, putData] = await hypfRequest.put(
    `/api/business/${id}`,
    {},
    data
  );

  if (putErr) {
    throw putErr;
  }

  return putData;
}

export async function removeBusiness(id: number) {
  const [deleteErr, deleteData] = await hypfRequest.delete(
    `/api/business/${id}`
  );

  if (deleteErr) {
    throw deleteErr;
  }

  return deleteData;
}

export async function changeStatus(id: number, column: string, ENUM: string) {
  const [putErr, putData] = await hypfRequest.put(
    `/api/business/${id}`,
    {},
    {
      [column]: ENUM,
    }
  );

  if (putErr) {
    throw putErr;
  }

  return putData;
}
