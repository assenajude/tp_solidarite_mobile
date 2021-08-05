import {useSelector} from "react-redux";
import useAuth from "./useAuth";
import dayjs from "dayjs";

let useMainFeatures;
export default useMainFeatures = () => {
    const {dataSorter} = useAuth()
    const allProducts = useSelector(state => state.entities.main.list)
    const listCategories = useSelector(state => state.entities.categorie.list)
    const orderList = useSelector(state => state.entities.order.currentUserOrders)
    const listArticles = useSelector(state => state.entities.article.availableArticles)

    const getCategorieInfos = (categorie) => {
        const categorieProducts = allProducts.filter(product => product.CategorieId === categorie.id)
        let categorieProduct = {};
        let productLength = 0
        if(categorieProducts && categorieProducts.length>0) {
            productLength = categorieProducts.length
            if(categorie.typeCateg === 'article') {
                categorieProducts.sort((a, b) => {
                    if(a.prixPromo>b.prixPromo) return 1
                    if(a.prixPromo<b.prixPromo) return -1
                    return 0
                })
                categorieProduct = {...categorieProducts[0],
                    firstPrice:categorieProducts[0]?.prixPromo,
                    secondPrice: categorieProducts.pop()?.prixPromo,
                    productLength
                }
            }else {
                categorieProducts.sort((a, b) => {
                    if(a.coutPromo>b.coutPromo) return 1
                    if(a.coutPromo<b.coutPromo) return -1
                    return 0
                })
                categorieProduct = {...categorieProducts[0],
                    firstPrice:categorieProducts[0]?.coutPromo,
                    secondPrice: categorieProducts.pop()?.coutPromo,
                    productLength
                }
            }
        }
        return {categorieProduct}
    }

    const getProductsByCategories = () => {
        const allCategoriesProducts = []
        listCategories.forEach(categorie => {
            const selectedCatProd = getCategorieInfos(categorie).categorieProduct

            if(Object.keys(selectedCatProd).length>0) {
                    allCategoriesProducts.push(selectedCatProd)
            }
        })
        const newList = dataSorter(allCategoriesProducts)
        return newList
    }

    const getOrderArticleOccurence = (list, itemId)=> {
         const itemTab = list.filter(selected => selected.OrderItem.productId === itemId)
        return itemTab.length
    }

    const getBestSellerArticles = () => {
        const orderItems = orderList.map(order => order.CartItems)
        const newTab = []
        for(let item of orderItems) {
            for(let orderItem of item) {
                newTab.push(orderItem)
            }
        }
        const newArticleTab = []
        listArticles.forEach(article => {
            const lastOccur = getOrderArticleOccurence(newTab, newArticleTab[0]?.id)
            const occurLenght = getOrderArticleOccurence(newTab, article.id)
            if(occurLenght>0) {
                if(lastOccur && occurLenght > lastOccur) {
                    newArticleTab.unshift(article)
                }else {
                    newArticleTab.push(article)
                }
            }

        })

        return newArticleTab
    }

    const getFlashPromo = () => {
        const currentFlash = []
        const otherFlash = []
        const flashArticles = listArticles.filter(article => article.flashPromo === true)
            flashArticles.forEach(item => {
                if(item.debutFlash && item.debutFlash !== null && item.debutFlash !== undefined) {
                     const debutFlashDate = dayjs(item.debutFlash)
                     const currentDate = dayjs()
                     if(debutFlashDate.date() === currentDate.date()) {
                         currentFlash.push(item)
                     }else {
                         otherFlash.push(item)
                     }
                }
            })
        return {currentFlash, otherFlash}
    }


    return {getCategorieInfos, getProductsByCategories, getBestSellerArticles, getFlashPromo}
}