import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Icon, Col, Card, Row } from 'antd'
import { Carousel } from 'antd'
import Meta from 'antd/lib/card/Meta';
import ImageSlider from '../../utils/ImageSlider';
import CheckBox from './Section/CheckBox';
import RadioBox from './Section/RadioBox'
import { continents, price } from './Section/Datas';
import SearchFeature from './Section/SearchFeature';

function LandingPage() {

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })
    const [SearchTerm, setSearchTerm] = useState("")

    useEffect(() => {

        let body = {
            skip: Skip,
            limit: Limit
        }

        getProducts(body)


    }, [])

    const getProducts = (body) => {
        Axios.post('/api/product/products', body)
            .then(response => {
                if (response.data.success) {
                    // console.log(response.data)
                    if (body.loadMore) {
                        setProducts([...Products, ...response.data.productInfo])
                    } else {
                        setProducts(response.data.productInfo)
                    }
                    setPostSize(response.data.postSize)
                } else {
                    alert("상품들을 가져오는 데 실패했습니다.")
                }
            })
    }
    const loadMoreHandler = (event) => {

        let skip = Skip + Limit

        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }

        getProducts(body)
        setSkip(skip)

    }


    const showFilteredResult = (filters) => {
        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }
        // console.log(body.filters)
        getProducts(body)
        setSkip(0);
    }

    const handlePrice = (value) => {
        const data = price
        let array = []

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array
            }
        }

        return array
    }

    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters }

        newFilters[category] = filters

        if (category === "price") {
            let prriceValues = handlePrice(filters)
            newFilters[category] = prriceValues
        }
        console.log(newFilters)
        showFilteredResult(newFilters)
        setFilters(newFilters)
    }

    const updateSearchTerm = (newSearchTerm) => {
        // console.log(newSearchTerm)
        setSearchTerm(newSearchTerm)


        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerm(newSearchTerm)
        getProducts(body)
    }

    const renderCards = Products.map((product, index) => {
        return <Col lg={6} md={8} xs={24} key={index}>
            <Card
                cover={<ImageSlider images={product.images} />}>
                <Meta
                    title={product.title}
                    description={product.price} />
            </Card>
        </Col>
    })
    return (
        <div style={{ width: '75%', margin: '3rem auto', display: 'flex', flexDirection: 'column' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>Let's Travel Anywhere<Icon type="rocket" /></h2>
            </div>
            <Row gutter={[16, 16]}>
                <Col lg={12} xs={24}>
                    <CheckBox list={continents} handleFilters={filters => handleFilters(filters, "continents")} />
                </Col>
                <Col lg={12} xs={24}>
                    <RadioBox list={price} handleFilters={filters => handleFilters(filters, "price")} />
                </Col>
            </Row>


            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem 0rem' }}>
                <SearchFeature refreshFunction={updateSearchTerm} />
            </div>

            <Row gutter={[16, 16]}>
                {renderCards}
            </Row>

            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <button onClick={loadMoreHandler}>더보기</button>
                </div>
            }


        </div>
    )
}

export default LandingPage
