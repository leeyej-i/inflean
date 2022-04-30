import React from 'react';
import { formatRelativeDate } from '../helpers.js';

// 컴포넌트 조합(방법1)
// const List = ({ data = [], onClick, renderItem }) => {
//     return (
//         <ul className='list'>
//             {data.map((item, index) => {
//                 return (
//                     <li key={item.id}
//                         onClick={() => onClick(item.keyword)}>
//                         {renderItem(item, index)}
//                     </li>
//                 )
//             })}
//         </ul>
//     )
// }

// 특수화(방법2)
const List = ({ data = [], onClick, hasIndex = false, hasDate = false, onRemove, }) => {

    const handleClickRemoveHistory = (event, keyword) => {
        event.stopPropagation();
        onRemove(keyword);
    }

    return (
        <ul className='list'>
            {data.map((item, index) => {
                return (
                    <li key={item.id}
                        onClick={() => onClick(item.keyword)}>
                        {hasIndex && <span className="number">{index + 1}</span>}
                        <span>{item.keyword}</span>
                        {hasDate && <span className="date">{formatRelativeDate(item.date)}</span>}
                        {!!onRemove && <button className="btn-remove" onClick={event => handleClickRemoveHistory(event, item.keyword)}></button>}
                    </li>
                )
            })}
        </ul>
    )
}

export default List;