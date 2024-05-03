import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:3000',
      prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
      }
    }),
    endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: '/users/register',
        method: 'POST',
        body: user
      })
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: credentials
      })
    }),
    createApplication: builder.mutation({
      query: (application) => ({
        url: '/users/applications',
        method: 'POST',
        body: application
      })
    }),
    getApplications: builder.query({
      query: (userId) => ({
        url: `/users/applications?userId=${userId}`,
      })
    }),
    updateApplication: builder.mutation({
      query: ({ id, status }) => ({
        url: `/users/admin/applications/${id}`,
        method: 'PUT',
        body: { status }
      })
    }),
    getAllApplications: builder.query({
      query: () => ({
        url: '/users/admin/applications',
      })
    }),
  })
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useCreateApplicationMutation,
  useGetApplicationsQuery,
  useUpdateApplicationMutation,
  useGetAllApplicationsQuery
} = userApi;
