import style from './Pagination.module.scss'
import {usePokemonsStore} from '../../store/pokemonsStore'
import {useState} from 'react'

export const Pagination = () => {
  const {count, fetchPokemons} = usePokemonsStore(state => state)
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage: number = 50
  const totalPages: number = Math.ceil(count / itemsPerPage)

  const pagesToShow: number[] = [];
  const numPagesToShow: number = 5;

  if (totalPages <= numPagesToShow) {
    for (let i = 1; i <= totalPages; i++) {
      pagesToShow.push(i);
    }
  } else {
    const startPage: number = Math.max(1, currentPage - 2);
    const endPage: number = Math.min(totalPages, startPage + numPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pagesToShow.push(i);
    }
  }
  return (
    <>
      <ul className={style.pagination}>
        {currentPage >= numPagesToShow - 1 && (
          <li className={style.parination_item} onClick={() => {
            setCurrentPage(1)
            fetchPokemons(0)
          }}>
            {"<<"}
          </li>
        )}

        {currentPage > numPagesToShow - (numPagesToShow - 1) && (
          <li className={style.parination_item} onClick={() => {
            setCurrentPage(currentPage - 1)
            fetchPokemons(itemsPerPage * (currentPage - 2))
          }}>
            {"<"}
          </li>
        )}

        {currentPage >= numPagesToShow - 1 && (
          <li>
            {"..."}
          </li>
        )}

        {pagesToShow.map((page) => (
          <li
            key={page}
            className={`${style.parination_item} ${currentPage === page ? style.active : ''}`}
            onClick={() => {
              setCurrentPage(page)
              fetchPokemons(itemsPerPage * (page - 1))
            }}
          >
            {page}
          </li>
        ))}

        {currentPage <= totalPages - numPagesToShow && (
          <li>
            {"..."}
          </li>
        )}

        {currentPage <= totalPages - 1 && (
          <li className={style.parination_item} onClick={() => {
            setCurrentPage(currentPage + 1)
            fetchPokemons(itemsPerPage * currentPage)
          }}>
            {">"}
          </li>
        )}

        {currentPage <= totalPages - numPagesToShow && (
          <li className={style.parination_item} onClick={() => {
            setCurrentPage(totalPages)
            fetchPokemons(itemsPerPage * (totalPages - 1))
          }}>
            {">>"}
          </li>
        )}
      </ul>
    </>
  )
}
