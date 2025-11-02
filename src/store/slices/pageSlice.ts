import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Data } from "@measured/puck";

interface PageState {
    data: Data;
}


const initialState: PageState = {
    data: {
        content: [],
        root: { props: { title: '' } },
    }
};


const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        setPageData: (state, action: PayloadAction<Data>) => {
            state.data = action.payload;
        }
    }
});


export const { setPageData } = pageSlice.actions;
export default pageSlice.reducer;