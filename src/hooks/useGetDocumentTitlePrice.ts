import { useEffect } from 'react'
import useGetCardioPrice from 'utils/useGetCardioPrice'

const useGetDocumentTitlePrice = () => {
  const cakePriceBusd = useGetCardioPrice()

  const cakePriceBusdString =
    Number.isNaN(cakePriceBusd) || cakePriceBusd === 0 || !cakePriceBusd
      ? ''
      : ` - $${cakePriceBusd.toLocaleString(undefined, {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        })}`

  useEffect(() => {
    document.title = `CardioSwap${cakePriceBusdString}`
  }, [cakePriceBusdString])
}
export default useGetDocumentTitlePrice
