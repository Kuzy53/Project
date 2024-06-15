import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:8000/',
      prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
          headers.set('authorization', `${token}`);
        }
        return headers;
      }
    }),
    endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: '/users/signup',
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
        url: '/courses',
        method: 'POST',
        body: application
      })
    }),
    getApplications: builder.query({
      query: () => ({
        url: `/courses`,
      })
    }),
    getLessonsByCourse: builder.query({
      query: (id) => ({
        url: `/courses/${id}`,
      })
    }),
    getProfile: builder.query({
      query: () => ({
        url: `/users/profile`,
      })
    }),
    getLessons: builder.query({
      query: (idLes) => ({
        url: `/lessons/${idLes}`,
      })
    }),
    updateApplication: builder.mutation({
      query: ({ id, status }) => ({
        url: `/users/admin/applications/${id}`,
        method: 'PUT',
        body: { status }
      })
    }),
    postLessons: builder.mutation({
      query: ({ idLes, template_data }) => ({
        url: `/lessons/${idLes}/solve`,
        method: 'POST',
        body: { template_data }
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
  useGetAllApplicationsQuery,
  useGetProfileQuery,
  useGetLessonsQuery,
  useGetLessonsByCourseQuery,
  usePostLessonsMutation
} = userApi;
