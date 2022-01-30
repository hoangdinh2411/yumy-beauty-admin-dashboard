export const actionTypes ={
    SIGN_IN_BY_USERNAME : 'sign in by username',
    SIGN_OUT: 'sign out'
}

const authActions ={
    signIn : (formData)=>{
        return {
            type: actionTypes.SIGN_IN_BY_USERNAME,
            payload: formData
        }
    },
    signout : ()=>{
        return {
            type: actionTypes.SIGN_OUT,
        }
    },
    
}

export default authActions