import React, { Component } from 'react'
import {connect} from 'react-redux';
import { fetchProductsRequest, fetchProductsSuccess, fetchProductsError } from '../actions/posts.action';

class Products extends Component {
    componentDidMount() {
        this.props.fetchProductsWithRedux()
    }
    render() {
        return (
            <div className="product-list">
                    {
                        this.props.posts.posts &&
                        this.props.posts.posts.map((post,index) => {
                            return (
                                // <li key={index}>{post.name}</li>
                                <div key={index} className={post.featured?"product featured":"product"}>
                                    <a className="product__cart" href="javscript:void(0)"><img src="img/icons/cart.svg" alt="cart" /><span>Add To Cart</span></a>
                                    <span className="product__price">{post.price} $</span>
                                    <figure><img className="product__image" src={"products/"+post.image} alt={post.name} /></figure>
                                    <h2 className="product__name">{post.name}</h2>
                                </div>
                            )
                        })
                    }
            </div>
        )
    }
}

function fetchProductsWithRedux() {
    return (dispatch) => {
        dispatch(fetchProductsRequest());
        return fetchProducts().then(([response, json]) => {
            if (response.status === 200) {
                console.log(json);
                dispatch(fetchProductsSuccess(json))
            }
            else {
                console.log('error');
                dispatch(fetchProductsError())
            }
        })
    }
}

function fetchProducts() {
    const URL = "/products";
    return fetch(URL, { method: 'GET' })
        .then(response => Promise.all([response, response.json()]));
}

// function mapStateToProps(state) {
//     return {
//         posts: state.posts
//     }
// }

// export default connect(mapStateToProps, { fetchProductsWithRedux })(Products);

export default connect(
    state => ({posts: state.posts}),
    {fetchProductsRequest, fetchProductsSuccess, fetchProductsError, fetchProductsWithRedux}
)(Products);
