
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAuth , createUserWithEmailAndPassword , signInWithEmailAndPassword ,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getFirestore,collection, addDoc, getDocs, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyBLqwOxwbWF89ZVE-Hx6Oauw9eIuy8Syp0",
    authDomain: "test-project-67367.firebaseapp.com",
    projectId: "test-project-67367",
    storageBucket: "test-project-67367.appspot.com",
    messagingSenderId: "986217264801",
    appId: "1:986217264801:web:ed5c55b76ba4fe71a322e0"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();


function register(user){
    const {firstName,email,password,phoneNumber} = user

    createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
        try {
            const docRef = await addDoc(collection(db, "users"), {
            firstName,
            email
            });
            alert('Signup Successfully')
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    const user = userCredential.user;
    

    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message.split(': ')[1]
    alert(errorMessage)
    });

}

function logIn(user){
    const{email,password}=user

    signInWithEmailAndPassword(auth, email, password)
.then((userCredential) => {
    
    const user = userCredential.user;
    alert('Logged In Successfully')
    
})
.catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message.split(': ')[1]
    alert(errorMessage)
});
}
onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
});

async function postToDb(ad){
try{
    const storageRef = ref(storage, `ads/${ad.image.name}`);

    await uploadBytes(storageRef, ad.image)
    const url = await getDownloadURL(storageRef)
        ad.image = url

    await addDoc(collection(db, "ads"),ad)
    alert('Data added successfully!')
}
catch (e) {
    alert(e.message)
}
}

async function getAds(){
    const querySnapshot = await getDocs(collection(db, "ads"));
    const ads=[]
querySnapshot.forEach((doc) => {
// console.log(doc.id, " => ", doc.data());
const ad = doc.data()
ad.id = doc.id
    ads.push(ad)
});
    return ads
}


async function  getSingleAd(adId){
    const docRef = doc (db, "ads",adId);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {

    const ad = docSnap.data()
    return ad

} else {
    console.log("No such document!");
}
}

export{
    register,
    logIn,
    postToDb,
    getAds,
    getSingleAd,
    onAuthStateChanged,
    auth
}



/*
    1. Upload image to Storage
    2. Get the URL of the image
    3. Add all data with URL in database
    */
