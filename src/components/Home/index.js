import {useEffect, useState} from 'react'
import {FaAngleRight} from 'react-icons/fa6'
import {FaArrowUp} from 'react-icons/fa'
import Cookies from 'js-cookie'
import GroceryList from '../GroceryList'
import GroceryItem from '../GroceryItem'
import Footer from '../Footer'

import './index.css'

const Home = () => {
  const [groceryList, setGrocery] = useState([])

  useEffect(() => {
    const categoriesImages = [
      {
        name: 'Fruits & Vegetables',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0SEVlN9EPbCg1L5nmqoP6RWn1sxRUNcqKUwpIDWbVOIKWyxfU',
      },
      {
        name: 'Cold Drinks & Juices',
        url: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQNhyLPLa64utMc9MTBGXFBUWoSeBcdJPFzXreLMFiP3ydLiDdb',
      },
      {
        name: 'Beverages',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGm9slgsn-SviYFhpXYffsALAOUBaChsptVw&s',
      },
      {
        name: 'Foodgrains, Oil & Masala',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREnlxT79VluTAKUWUk9M1Pvq2pKJfGryhiCw&s',
      },
      {
        name: 'Bakery, Cakes & Dairy',
        url: `https://sahnibakery.com/cdn/shop/products/BlackForestCake18YellowRoses7redroses6DairyMilkChocolates2249@2x.jpg?v=1609572858`,
      },
      {
        name: 'Snacks & Branded Foods',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0Dn6faPntWqMJk-g8Wuekb7PCOtVjMbLXew&s',
      },
      {
        name: 'Eggs, Meat & Fish',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwUMf8UBvE-MfA3Jd_1NNH2BhQxQjjI8nnow&s',
      },
      {
        name: 'Gourmet & World Food',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlTNGQ5jmgyQxTpRhE5Pier7YZIRA6Z_Twig&s',
      },
      {
        name: 'Baby Care',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO62IilpYb485n4rFDU-448tQ05MdoJe7ZuQ&s',
      },
      {
        name: 'Cleaning & Household',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-O5TPPCpiYV19d-18srCgcAQOvVOXz38oZA&s',
      },
      {
        name: 'Beauty & Hygiene',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQPzW4euasQNq_aWWIGz6BNTZ-QvX7UCtZCA&s',
      },
      {
        name: 'Kitchen, Garden & Pets',
        url: 'https://i5.walmartimages.com/asr/020c9c76-1307-4b99-879d-c0e7410aca26_1.45b8a03bb711d443a315c256509b3e38.jpeg',
      },
      {
        name: 'Chocolates & Candies',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ_Dlnnyd-WMfyZFvAUSMWj7jjxstPfV_QKQ&s',
      },
      {
        name: 'Dry Fruits',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6Yd8tErXbYHsj78ByKqfAdE8Epf6CdRp_gw&s',
      },
      {
        name: 'Indian Mithai',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE-E4_wIjO_kt6Hf9clqR5BNdN0l4ZA9fe0g&s',
      },
    ]
    const groceries = async () => {
      const jwtToken = Cookies.get('jwt_token')
      const url = 'https://apis2.ccbp.in/nxt-mart/category-list-details'
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        const fetchedData = data.categories.map(each => ({
          name: each.name,
          products: each.products.map(product => ({
            id: product.id,
            productName: product.name,
            weight: product.weight,
            price: product.price,
            imageUrl: product.image,
            quantity: 0,
          })),
        }))

        const finalList = fetchedData.map(category => {
          const matchingImage = categoriesImages.find(
            item => item.name === category.name,
          )
          return matchingImage
            ? {...category, url: matchingImage.url}
            : category
        })

        setGrocery(finalList)
      }
    }
    groceries()
  }, [])

  const onActiveGrocery = item => {
    console.log(item)
  }

  return (
    <div className="main" id="main">
      <div className="groceryDisplay">
        <GroceryList
          groceryList={groceryList}
          onActiveGrocery={onActiveGrocery}
        />
      </div>
      <div className="groceries">
        {groceryList.map(each => (
          <div className="groceriesItemMain" key={each.name}>
            <div className="groceryTypeHead" id={each.name}>
              <h1>
                {each.name} <FaAngleRight />
              </h1>
              <button type="button">Scroll</button>
            </div>
            <div className="itemContainerBehaviour">
              <GroceryItem groceryItemList={each.products} />
            </div>
          </div>
        ))}
      </div>
      <a href="#main" className="backtoTop">
        <FaArrowUp />
      </a>

      <div className="footerHeader">
        <Footer />
      </div>
    </div>
  )
}

export default Home
