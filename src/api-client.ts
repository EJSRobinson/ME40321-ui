import { GridBody } from '@mui/x-data-grid';
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
    setConstraints: builder.mutation<string, any>({
      query: (body) => ({
        url: `addConstraintSet`,
        method: 'POST',
        body: body,
      }),
    }),
    setContext: builder.mutation<string, any>({
      query: (body) => ({
        url: `addContextSet`,
        method: 'POST',
        body: body,
      }),
    }),
    getPlot: builder.query<any, string>({
      query: (body) => ({
        url: 'export',
        method: 'POST',
        body: body,
      }),
    }),
    getPlotData: builder.query<any, string>({
      query: (body) => ({
        url: 'exportData',
        method: 'POST',
        body: body,
      }),
    }),
  }),
});

export const {
  useCheckReadyToFinishQuery,
  useFinishMutation,
  useGetFinishedResultQuery,
  useSetConstraintsMutation,
  useSetContextMutation,
  useGetPlotQuery,
  useGetPlotDataQuery,
} = uiApiClient;
