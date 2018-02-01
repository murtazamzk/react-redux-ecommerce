import React, { Component } from 'react'
import {connect} from 'react-redux';
import { fetchProductsRequest, fetchProductsSuccess, fetchProductsError } from '../actions/posts.action';

class Products extends Component {
    componentDidMount() {
        this.props.fetchProductsWithRedux()
    }
    render() {
        return (
            <div>
                <ul>
                    {
                        this.props.posts.posts &&
                        this.props.posts.posts.map((post,index) => {
                            return (
                                <li key={index}>{post.name}</li>
                            )
                        })
                    }
                </ul>
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
    const URL = "http://localhost:3000/products";
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