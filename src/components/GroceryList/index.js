import {useState} from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const GroceryList = props => {
  const [activeId, setActive] = useState('')
  const {groceryList, onActiveGrocery} = props
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  }
  const onGroceryButton = item => {
    onActiveGrocery(item)
    setActive(item)
  }
  return (
    <div className="groceryList" id="Grocery">
      <Slider {...settings}>
        {groceryList.map(each => (
          <div key={each.name}>
            <a href={`#${each.name}`}>
              <button
                className="groceryTitle"
                type="button"
                onClick={() => {
                  onGroceryButton(each.name)
                }}
              >
                <div>
                  <img src={each.url} />
                  <p>{each.name}</p>
                </div>
              </button>
            </a>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default GroceryList
