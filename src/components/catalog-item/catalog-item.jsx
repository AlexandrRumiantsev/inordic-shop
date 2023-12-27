import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Loader } from '../loader'
import './style.css';
import { createExtraActions }  from '../../store/action/goods'

export function CatalogItem() {
    // useParams позволяет получить значения из поисковой строки
    const { id } = useParams();
    const dispatch = useDispatch()
    const [countGood, setCountGood] = useState(1)

    // Получим товар из стора
    const { TITLE, DISCR, PRICE, IMG, COUNT }  = useSelector((state) => state.goods.item)
    // Получим признак загрузки из стора 
    const loading = useSelector((state) => state.goods.item.loading)
    
    // Из createExtraActions получить нужный экшн
    const { getItemGoods } = createExtraActions()

    useEffect(() => {
        //Запросить данные о товаре
        dispatch(getItemGoods(id))
    }, [])

    const handlerAddToBasket = () => {
        // TODO Доделать добавление товара из корзины
        alert('Добавление товара в корзину')
    }

    const handlerClick = (operation) => {
        if (operation == 'mines') {
            const newCount = countGood - 1
            if (countGood > 1) {
                setCountGood(newCount)
            }
        } else {
            setCountGood((prevCount) => 
                prevCount < COUNT ? ++prevCount : prevCount
            )
        }
    }

    if (loading) {
        return <Loader />
    }

    return (
        <div className='good-item'>
            <img src={IMG} />
            <h1>{TITLE}</h1>
            <h2>{DISCR}</h2>
            <p>{PRICE}</p>
            <div className='buttons-block'>
                <button onClick={() => handlerClick('mines')}>
                    -
                </button>
                <p>
                    {countGood}
                </p>
                <button onClick={() => handlerClick('plus')}>
                    +
                </button>
            </div>
            {
                countGood == COUNT ? (
                    <div className="error">
                        На складе всего {COUNT} штук данного товара, вы не можете добавить больше
                    </div>
                ) : ''
            }
            <button className="add-to-basket" onClick={() => handlerAddToBasket()}>
                Добавить в корзину
            </button>
        </div>
    )
}