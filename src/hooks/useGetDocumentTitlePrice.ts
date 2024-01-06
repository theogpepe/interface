import { useEffect } from 'react'
import useGetPepePrice from 'utils/useGetPepePrice'

const useGetDocumentTitlePrice = () => {
  const cakePriceBusd = useGetPepePrice()

  const cakePriceBusdString =
    Number.isNaN(cakePriceBusd) || cakePriceBusd === 0 || !cakePriceBusd
      ? ''
      : ` - $${cakePriceBusd.toLocaleString(undefined, {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        })}`

  useEffect(() => {
    document.title = `PEPE${cakePriceBusdString}`
  }, [cakePriceBusdString])
}
export default useGetDocumentTitlePrice
