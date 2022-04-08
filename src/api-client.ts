import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

export const uiApiClient = createApi({
  reducerPath: 'uiApiClient',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:2700/api/v1/',
    prepareHeaders: (headers, { getState }) => {
      headers.set('Access-Control-Allow-Origin', '*');
      return headers;
    },
  }),
  tagTypes: [],
  endpoints: (builder) => ({
    checkReadyToFinish: builder.query<boolean, null>({
      query: () => ({
        url: 'checkReadyToFinish',
        method: 'POST',
        body: '',
      }),
    }),
    getFinishedResult: builder.query<any, null>({
      query: () => ({
        url: 'getFinals',
        method: 'POST',
        body: '',
      }),
    }),
    finish: builder.mutation<string, null>({
      query: () => ({
        url: `finish`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useCheckReadyToFinishQuery, useFinishMutation, useGetFinishedResultQuery } =
  uiApiClient;
