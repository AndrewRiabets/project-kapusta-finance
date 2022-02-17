import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/api/auth',
        credentials: 'include'
    }),
    tagTypes: ['Auth'],
    endpoints: builder => ({
        registrationUser: builder.mutation({
            query: newUser => ({
                url: '/registration',
                method: 'POST',
                body: newUser
            }),
            invalidatesTags: ['Auth'],
        }),
        loginUser: builder.mutation({
            query: dataLogin => ({
                url: '/login',
                method: 'POST',
                body: dataLogin,
            }),
            invalidatesTags: ['Auth'],
        }),
        logoutUser: builder.mutation({
            query: accessToken => ({
                url: '/logout',
                method: 'POST',
                headers: {
                    Authorization : `Bearer ${accessToken}`
                }
            }),
            invalidatesTags: ['Auth'],
        }),
        refreshToken: builder.mutation({
            query: () => ({
                url: '/refresh',
                method: 'GET'
            }),
            invalidatesTags: ['Auth'],
        })
    })
})

export const {
    useRegistrationUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useRefreshTokenMutation,
} = authAPI