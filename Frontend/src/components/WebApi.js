
const Api = {

    // user auth api 
    sendOTPApi: "http://localhost:8000/api/user/sendOTP",
    registrationApi: "http://localhost:8000/api/user/register",
    LoginApi: "http://localhost:8000/api/user/signIn",
    // Get Catgeory Api
    GetCategoryList: "http://localhost:8000/api/category/CategoryList",
    GetCategoryByID: "http://localhost:8000/api/category/fetchCategoryById/id",
    GetCategoryByName: "http://localhost:8000/api/category/fetchCategoryByName/name",
    // Add Category 
    AddCategoryName: "http://localhost:8000/api/category/addCategory",
    // Get Product api 
    GetAllProduct: "http://localhost:8000/api/product/productList",
    GetProductByID: "http://localhost:8000/api/product/fetchProductById/id",
    GetProductByName: "http://localhost:8000/api/product/fetchProductByName/name",
    // Update Product By Id
    UpdateProductByID: "http://localhost:8000/api/product/updateProduct",
    // Delete Product 
    DeleteProductByName: "http://localhost:8000/api/product/removeProductByName/name",
    // add category scrap
    AddScrapCategory: 'http://localhost:8000/api/scrapCategory/add-category',
    GetScrapCategory: 'http://localhost:8000/api/scrapCategory/getcategoryList',
    // get prpoduct By user id 
    GetPRoductByUserID: `http://localhost:8000/api/product/fetchProductByUserId`,
    // get scrap by user Id
    AddScrapProduct: `http://localhost:8000/api/scrapProduct/addProduct `,
    GetScrapByUserID: 'http://localhost:8000/api/scrapProduct/getProduct-byuserid',
    // Admin 
    AdminSignUpApi: "http://localhost:8000/api/admin/register",
    AdminSignInApi: "http://localhost:8000/api/admin/signIn",
    // Add Prdoduct
    AddProductByUserID: `http://localhost:8000/api/product/addProduct`,
    DeleteProductById: `http://localhost:8000/api/product/removeProductById`,
    DeleteScrapProductById: `http://localhost:8000/api/scrapProduct/deleteproduct-byid`,
    // profiel update
    updateUserDetails: "http://localhost:8000/api/user/change-username",
    blockUser: 'http://localhost:8000/api/user/blockuser-byid',
    unBlockUser: 'http://localhost:8000/api/user/unblockuser-byid',
    GetScrapList: 'http://localhost:8000/api/scrapProduct/getProductList',
    deleteScrapItem: 'http://localhost:8000/api/scrapProduct/deleteproduct-byid',
    deleteProductItem: 'http://localhost:8000/api/product/removeProductById',
    // add to cart
    AddToCart: "http://localhost:8000/api/cart/addToCart",
    GetCartItems: "http://localhost:8000/api/cart/fetchCart",
    RemoveProductItem: "http://localhost:8000/api/cart/removeCartItems",
    // Address 
    AddAddress: "http://localhost:8000/api/address/addAddress",
    GetAddress: "http://localhost:8000/api/address/getAddress",
    UpdateAddress: "http://localhost:8000/api/address/updateAddress",
    GetVehicle: `http://localhost:8000/api/Vahicle/getVehicleList`

}

export default Api;