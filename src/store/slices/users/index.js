import { createSlice } from '@reduxjs/toolkit';
import { createExtraActions } from '../../action/users';


const { getItemUser } = createExtraActions()

// Создадим объект слайса 
export const slice = createSlice(
    {
       // Устанавливаем название слайса
       name: 'users',
       // Состояние слайса по умолчанию
       initialState: {
          item: null,
       },
       extraReducers: (builder) => {
         // Кейс который получает пользователя и записывает в глобальное состояние
        /*builder.addCase('GET_ITEM_USER', (state, action) => {   
          const { payload } = action
          state.item = payload
        })*/
        builder.addCase(getItemUser.fulfilled, (state, action) => {   
         const { payload } = action
         state.item = payload
       })

       }
    }
)