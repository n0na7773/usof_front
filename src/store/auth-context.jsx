import React, {useState} from 'react';

const AuthContext = React.createContext({
    token:'',
    userId: null,
    userLogin: '',
    email: '',
    fullName:'',
    avatarUrl:'',
    role: '',
    isLoggedIn: false,
    logInNow: false,
    switchLogInNow: () => {},
    login: (userData) => {},
    logout: () => {},
    changeAvatar: () => {}, 
    editProfile: () => {},
});

export const AuthContextProvider = (props) => {

    const [logInNow, setLogInNow] = useState(false);
    const initialToken = localStorage.getItem('token');
    const initialLogin = localStorage.getItem('userLogin');
    const initialAvatarUrl = localStorage.getItem('avatarUrl');
    const initialUserId = localStorage.getItem('userId');
    const initialEmail = localStorage.getItem('email');
    const initialFullName = localStorage.getItem('fullName');
    const initialRole = localStorage.getItem('role');

    const [token, setToken] = useState(initialToken);
    const [login, setLogin] = useState(initialLogin);
    const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);
    const [email, setEmail] = useState(initialEmail);
    const [userId, setUserId] = useState(initialUserId);
    const [fullName, setFullName] = useState(initialFullName);
    const [role, setRole] = useState(initialRole);

    const isLoggedIn = !!token;

    const switchLogInNowHandler = () => {
        setLogInNow((prevState) => !prevState);
    }

    const loginHandler = (userData) => {
        setToken(userData.token);
        setLogin(userData.user.login);
        setAvatarUrl(userData.user.avatar_url);
        setEmail(userData.user.email);
        setUserId(userData.user.id);
        setFullName(userData.user.full_name);
        setRole(userData.user.role);

        localStorage.setItem('token', userData.token);
        localStorage.setItem('userLogin', userData.user.login);
        localStorage.setItem('avatarUrl', userData.user.avatar_url);
        localStorage.setItem('userId', userData.user.id);
        localStorage.setItem('email', userData.user.email);
        localStorage.setItem('fullName', userData.user.full_name);
        localStorage.setItem('role', userData.user.role);
    }

    const logoutHandler = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/auth/logout', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    Authorization: "Bearer " + token,
                }
            });
            const data = await response.json();

            if (response.ok) {
                console.log(data);
                setToken(null);
                setLogin('');
                setAvatarUrl('');
                setEmail('');
                setUserId(null);
                setFullName('');
                setRole('');

                localStorage.removeItem('token');
                localStorage.removeItem('userLogin');
                localStorage.removeItem('avatarUrl');
                localStorage.removeItem('userId');
                localStorage.removeItem('email');
                localStorage.removeItem('fullName');
                localStorage.removeItem('role');
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            alert(error);
        }
    }

    const changeAvatarHandler = (newUrl) => {
        setAvatarUrl(newUrl);
        localStorage.setItem('avatarUrl', newUrl);
    }

    const editProfileHandler = (newName) => {
        setFullName(newName);
        localStorage.setItem('fullName', newName);
    }

    let contextValue = {
        token: token,
        userLogin: login,
        avatarUrl: avatarUrl,
        userId: userId,
        email: email,
        fullName:fullName,
        role: role,
        isLoggedIn: isLoggedIn,
        logInNow: logInNow,
        switchLogInNow: switchLogInNowHandler,
        login: loginHandler,
        logout: logoutHandler,
        changeAvatar:changeAvatarHandler,
        editProfile:editProfileHandler
    };

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}


export default AuthContext;