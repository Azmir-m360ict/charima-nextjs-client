import { IProductAttribute } from '@/types/Product.type';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface VariationState {
  variationSection: IProductAttribute[];
}

const initialState: VariationState = {
  variationSection: [],
};

export const variationSlice = createSlice({
  name: 'variation',
  initialState,
  reducers: {
    setVariation: (state, action: PayloadAction<IProductAttribute>) => {
      const { av_id, a_name, av_value } = action.payload;

      // Find the index of the variation with the same name
      const existingVariationIndex = state.variationSection.findIndex(
        (variation) => variation.a_name === a_name
      );

      if (existingVariationIndex >= 0) {
        // If the variation with the same name exists, update both id and value
        state.variationSection[existingVariationIndex] = {
          ...state.variationSection[existingVariationIndex],
          av_id,
          av_value,
        };
      } else {
        // If the variation with the same name doesn't exist, add the new variation
        state.variationSection.push(action.payload);
      }
    },

    clearVariation: (state) => {
      state.variationSection = [];
    },
  },
});

export const { setVariation, clearVariation } = variationSlice.actions;

export default variationSlice.reducer;
