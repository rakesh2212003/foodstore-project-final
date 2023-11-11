export const setAllUserDetails = (data) => {
    return{
        type: 'SET_ALL_USER',
        allUsers: data,
    }
}

export const getAllUsersDetails = () => {
    return{
        type: 'GET_ALL_USER',
    }
}

export const setAllUserNull = () => {
    return{
        type: 'SET_ALL_USER_NULL',
        allUsers: null,
    }
}