import { createSlice } from "@reduxjs/toolkit"

const inititalState = createSlice ({
    users : [],
    error: "",
    isFetching: false,
    isSuccess: false
})

export const 