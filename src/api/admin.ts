import axios from 'axios';
axios.defaults.withCredentials = true;

export async function postFestivalData(
  data: IFestivalData,
): Promise<{ message: string } | void> {
  const response = await axios.post<{ message: string }>(`/admin/festival`, {
    data,
  });
  return response.data;
}

export async function patchFestivalData(
  data: IFestivalData,
): Promise<{ message: string } | void> {
  const response = await axios.patch<{ message: string }>(`/admin/festival`, {
    data,
  });
  return response.data;
}

export async function deleteFestivalData(
  _id: string,
): Promise<{ message: string } | void> {
  const response = await axios.patch<{ message: string }>(`/admin/festival`, {
    festivalId: _id,
  });
  return response.data;
}

export async function postArtistData(
  data: IArtistData,
): Promise<{ message: string } | void> {
  const response = await axios.post<{ message: string }>(`/admin/festival`, {
    data,
  });
  return response.data;
}

export async function patchArtistData(
  data: IArtistData,
): Promise<{ message: string } | void> {
  const response = await axios.patch<{ message: string }>(`/admin/festival`, {
    data,
  });
  return response.data;
}

export async function deleteArtistData(
  _id: string,
): Promise<{ message: string } | void> {
  const response = await axios.patch<{ message: string }>(`/admin/festival`, {
    festivalId: _id,
  });
  return response.data;
}

export interface IFestivalData {
  name: string | null;
  startDate: string | null;
  endDate: string | null;
  description: string | null;
  homepage: string | null;
  poster: string | null;
  video: string | null;
  countryId: string | null;
  genreId: string | null;
  artists: string[] | null;
}

export interface IArtistData {
  name: string | null;
  description: string | null;
  image: string | null;
  video: string | null;
  genreId: string | null;
  festivals: string[] | null;
}
