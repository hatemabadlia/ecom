    // src/services/productService.js
    import { db } from '../../firebaseconfig';
    import { collection, getDocs } from 'firebase/firestore';

    const productCollectionRef = collection(db, 'products');

    export const getProducts = async () => {
    const data = await getDocs(productCollectionRef);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    };
