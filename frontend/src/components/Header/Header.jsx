import React from 'react'
import './Header.css'

const Header = () => {
    return (
        <div className='header'>
            <div className='header-contents'>
                <h2>Order your preferred food here.</h2>
                <p>Select from a varied menu offering exquisite dishes crafted with premium ingredients and culinary mastery. Our mission is to fulfill your cravings and enhance your dining experience, one delightful meal at a time.</p>
                <a href="#ExploreMenu"><button>View Menu</button> </a>
            </div>
        </div>
    )
}

export default Header
