import Axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import ProductImage from './Section/ProductImage'
import ProductInfo from './Section/ProductInfo'
import { Row, Col } from 'antd'
import { addToCart } from '../../../_actions/user_actions'

function DetailProductPage(props) {


    const productId = props.match.params.productId
    const [Product, setProduct] = useState({})



    useEffect(() => {
        Axios.get(`/api/product/products_by_id?id=${productId}&type=single`)
            .then(response => {
                if (response.data.success) {
                    // console.log(response.data)
                    setProduct(response.data.product[0])
                } else {
                    alert('상세 정보 가져오기를 실패했습니다.')
                }
            })
    })

    return (
        <div style={{ width: '100%', padding: '3rem 4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1>{Product.title}</h1>
            </div>
            <br />
            <Row gutter={[16, 16]}>
                <Col lg={12} sm={24}>
                    <ProductImage detail={Product} />
                </Col>
                <Col lg={12} sm={24}>
                    <ProductInfo detail={Product} />
                </Col>
            </Row>

        </div >
    )
}

export default DetailProductPage