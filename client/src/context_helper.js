import { object, shape, func, string, array, number } from "prop-types";

export function mapSessionContextToProps(context) {
  return {
    sessionContext: {
      token: context.jwtToken,
      user: context.user,
      saveSession: context.actions.saveSession,
      clearSession: context.actions.clearSession,
    }
  };
}

export function mapItemsToCart(context) {
  return {
    sessionCartInfo: {
      cartProductList: context.cartProductList,
      noOfItems: context.noOfItems,
      cartProductInfoList: context.cartProductInfoList,
      updateCartProductList: context.actions.updateCartProductList,
      updateCartProductInfoList: context.actions.updateCartProductInfoList,
      updateNoOfItemInCart: context.actions.updateNoOfItemInCart
    }
  }
}

export function mapMessageContextToProps(context) {
  return {
    messageContext: {
      messages: context.messages,
      clearMessages: context.actions.clearMessages,
      setSuccessMessages: context.actions.setSuccessMessages,
      setErrorMessages: context.actions.setErrorMessages,
      setInfoMessages: context.actions.setInfoMessages
    }
  };
}

export const sessionCartInfoPropType = {
  sessionCartInfo: shape({
    cartProductList: array,
    noOfItems: number,
    cartProductInfoList: array,
    updateCartProductList: func.isRequired,
    updateCartProductInfoList: func,
    updateNoOfItemInCart: func
  })
}

export const sessionContextPropType = {
  sessionContext: shape({
    token: string,
    user: object,
    saveSession: func.isRequired,
    clearSession: func.isRequired,
  }).isRequired
};

export const messageContextPropType = {
  messageContext: shape({
    messages: object.isRequired,
    clearMessages: func.isRequired,
    setSuccessMessages: func.isRequired,
    setErrorMessages: func.isRequired,
    setInfoMessages: func.isRequired
  }).isRequired
};
