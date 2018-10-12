import { object, shape, func, string } from "prop-types";

export function mapSessionContextToProps(context) {
  return {
    sessionContext: {
      token: context.jwtToken,
      user: context.user,
      saveSession: context.actions.saveSession,
      clearSession: context.actions.clearSession,
      updateUserProfile: context.actions.updateUserProfile
    }
  };
}

export const sessionContextPropType = {
  sessionContext: shape({
    token: string,
    user: object,
    saveSession: func.isRequired,
    clearSession: func.isRequired,
    updateUserProfile: func.isRequired
  }).isRequired
};

export const authenticatedSessionContextPropType = {
  sessionContext: shape({
    token: string.isRequired,
    user: shape({
      firstName: string,
      lastName: string,
      email: string.isRequired,
      id: string,
      userType: string.isRequired
    }),
    saveSession: func.isRequired,
    clearSession: func.isRequired
  }).isRequired
};
