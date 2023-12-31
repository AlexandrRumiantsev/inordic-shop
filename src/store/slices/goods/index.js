import { createSlice } from '@reduxjs/toolkit';

import { createExtraActions } from '../../action/goods'

const { getAllGoods, getItemGoods } = createExtraActions()

// Создадим объект слайса 
export const slice = createSlice(
    {
       // Устанавливаем название слайса
       name: 'goods',
       // Состояние слайса по умолчанию
       initialState: {
          list: [],
          item: {
            loading: true
          },
          basket: [],
       },
       extraReducers: (builder) => {
         // Кейс который получает все товары и добавляет их в состояние редакса
         // Старный вариант, который не работает с асинхронным запросом
        /*builder.addCase('GET_ALL_GOODS', (state, action) => {
          console.log('Сработал экстра редьюсер GET_ALL_GOODS', state, action)
          // Вытаскиваем поле payload и записываем в лист
          const { payload } = action
          // Заполним стейт
          state.list = payload
        })*/

        // Запрос в процессе
        builder.addCase(getAllGoods.pending, (state, action) => {
          console.log('Запросв состоянии pending')
        })
        // Запрос успешно завершился
        builder.addCase(getAllGoods.fulfilled, (state, action) => {
            console.log('Запросв состоянии fulfilled', action)
            const { payload } = action
            // Заполним стейт
            state.list = payload
         })
         // Запрос не завершился успешно
         builder.addCase(getAllGoods.rejected, (state, action) => {
            console.log('Запросв состоянии rejected')
         })

         builder.addCase(getItemGoods.fulfilled, (state, action) => {
            console.log('Запросв состоянии fulfilled', action)
            const { payload } = action
            // Заполним стейт
            state.item = payload[0]
         })

        // Кейс для добавления товара в корзину
        builder.addCase('ADD_TO_BASKET', (state, action) => {
             const { payload } = action
            // Добавить в состояние корзины, передаваемый товар
            // Необходимо пушить, только если товара в коризне еще нет
            const findResult = state.basket.find(good => {
               console.log('good',good.ID)
               console.log('payload',payload.ID)
               if(good.ID == payload.ID) {
                  return true
               }
            })
            // Если добавляемый товар уже нашелся в стэйте корзины, заново добавлять его не нужно
            if (!findResult) {
               state.basket.push(payload)
            }
        })

       }
    }
)