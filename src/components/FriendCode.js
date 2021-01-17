
import firebase from 'firebase/app'
import { useAuthState } from 'react-firebase-hooks/auth'
import { LoadingOutlined } from '@ant-design/icons'
import {useState, useEffect} from 'react'
import { Typography } from 'antd'
export default function FriendCode() {
    const [user, loading] = useAuthState(firebase.auth())
    const [friendCode, setFriendCode] = useState(null)

    useEffect(() => {
        if (!user) {
            setFriendCode(null)
            return
        }
        firebase.firestore()
            .collection('users')
            .doc(user.uid)
            .get()
            .then((snapshot) => {
                setFriendCode(snapshot.get('friendCode'))
            })
    }, [user])

    if (loading) {
        return(<LoadingOutlined spin={true} />)
    } else if (user) {
        return(<Typography.Title level={5}
            style={{}}>Friend
      Code: {friendCode}</Typography.Title>)
    } else {
        return(<></>)
    }

}
