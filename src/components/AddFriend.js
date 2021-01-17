import {useState} from 'react'
import firebase from 'firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import {Input, Button} from 'antd'
export default function AddFriend() {
    const [friendCodes, setFriendCodes] = useState("");
    const [user] = useAuthState(firebase.auth());
    const getFriend = () => {
        const code = friendCodes;
        console.log(code);
        if (user) {
            firebase.firestore()
                .collection('users')
                .doc(user.uid)
                .update({friends: firebase.firestore.FieldValue.arrayUnion(code)})
        setFriendCodes("");
        } else {
            console.log("usernotfound :(")
        }

    }
    return (
        <>
            <Input placeholder="Friend Code" value = {friendCodes} onChange={(e) => setFriendCodes(e.target.value)} />
            <Button onClick={getFriend}> Add Friend </ Button>

        </>
    )
}
