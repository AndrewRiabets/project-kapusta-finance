import { Oval } from 'react-loader-spinner'
import style from './GoogleRedirect.module.css'
import { useLocation } from 'react-router'
import { useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import { useRefreshTokenMutation } from '../../redux/services/authAPI'
import * as actions from '../../redux/auth/auth-actions'

export default function GoogleRedirect() {
    const dispatch = useDispatch()
    const [getCurrentUser] = useRefreshTokenMutation()
    const location = useLocation()

    const sendDataInStore = useCallback(
    (response) => {
      dispatch(actions.user({...response.data.user,name: response.data.user.email.match(/.+?(?=@)/)[0],}));
      dispatch(actions.accessToken(response.data.accessToken));
      dispatch(actions.isLoggedIn(true));
    },
    [dispatch]
  );

  const loginByParams = useCallback(() => {
    const accessToken = new URLSearchParams(location.search).get('accessToken')
    const email = new URLSearchParams(location.search).get('email')
    const id = new URLSearchParams(location.search).get('id')
    const response = {
      data: {
        user: {
          id: id,
          email: email,
        },
        accessToken: accessToken
      }
    }
    sendDataInStore(response)
  }, [location.search, sendDataInStore])

    const loginByGoogle = useCallback(async () => {
      try {
        const response = await getCurrentUser()
        if (response.data) {
          sendDataInStore(response)
          return
        }
        loginByParams()
        } catch (error) {
          console.log(error);
        }
    }, [getCurrentUser, loginByParams, sendDataInStore]) 

    useEffect(() => {
      loginByGoogle()
    }, [loginByGoogle])

    return (
        <div className={style.spiner}>
            <Oval
              ariaLabel="loading-indicator"
              height={50}
              width={50}
              strokeWidth={3}
              color="rgba(255, 117, 29, 1)"
              secondaryColor="rgba(170, 178, 197, 0.7)"
            />
        </div>
    )
}