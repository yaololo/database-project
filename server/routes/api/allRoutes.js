const placeOrderHandler= require('../actions/placeOrderHandler');
const loginHandler = require('../actions/loginHandler');
const signUpHandler = require('../actions/signUpHandler');
const onLandingAction = require('../actions/onLanding');
const handleAsyncError = require("express-async-wrap");
const deleteItemsOnCheckout = require("../actions/deleteItemsOnCheckout");
const selectByCategory = require("../actions/selectByCategory");
const cartDetailsHandler = require('../actions/cartDetailsHandler')
const searchByPriceHandler = require('../actions/searchByPriceHandler')
const router = require('express').Router();

router.get('/hot_items', handleAsyncError(onLandingAction));

router.post('/user/signup', handleAsyncError(signUpHandler));

router.post('/user/login', handleAsyncError(loginHandler));

router.post('/my_cart_details', handleAsyncError(cartDetailsHandler));

router.post('/place_order', handleAsyncError(placeOrderHandler))

router.post('/search_by_price', handleAsyncError(searchByPriceHandler))








































































const addToCart = require("../actions/addToCart");
const bookMarkItem = require("../actions/bookMarkItem");
const deleteBookMarkItem = require("../actions/deleteBookMarkItem");
const addFeedback = require("../actions/addFeedback");
const selectByBrand = require("../actions/selectByBrand");
const createOrder = require("../actions/createOrder");
const custOrderHist = require("../actions/custOrderHist");
const searchByKeyword = require("../actions/searchByKeyword");
const searchByPrice = require("../actions/searchByPrice");
const viewBookmarkItem = require("../actions/viewBookmarkItem");
const deleteItemInCart = require("../actions/deleteItemInCart");
const viewOneSpecifiedOrderDetail = require("../actions/viewOneSpecifiedOrderDetail");
const viewFeedbackByAUser = require("../actions/viewFeedbackByAUser");
const viewFeedbackOfAProduct = require("../actions/viewFeedbackOfAProduct");
const cancelOrder = require("../actions/cancelOrder");
const updateProfileInfo = require("../actions/updateProfileInfo");

router.delete('/delete_cart_on_checkout', deleteItemsOnCheckout);

router.get("/select_By_Category", selectByCategory);

router.post("/add_to_cart",addToCart);

router.post("/book_mark_item",bookMarkItem);

router.delete("/delete_bookmark_item",deleteBookMarkItem);

router.post("/add_feedback",addFeedback);

router.get("/select_by_brand",selectByBrand);

router.post("/cust_order_hist",custOrderHist);

router.get("/search_by_keyword",searchByKeyword);

router.get("/search_by_price",searchByPrice);

router.post("/view_bookmark_item",viewBookmarkItem);

router.delete("/delete_item_in_cart",deleteItemInCart);

router.get("/view_one_specified_order_detail",viewOneSpecifiedOrderDetail);

router.get("/view_feedback_by_a_user",viewFeedbackByAUser);

router.get("/view_feedback_of_a_product",viewFeedbackOfAProduct);

router.post("/cancel_order",cancelOrder);

router.post("/update_profile_info",updateProfileInfo);

router.post("/create_order",createOrder);

module.exports = router;
