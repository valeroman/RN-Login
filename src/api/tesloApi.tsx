
import axios  from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


const baseURL = 'http://localhost:3001/api';

const tesloApi = axios.create({ baseURL });

tesloApi.interceptors.request.use(
    async(config) => {
        const token = await AsyncStorage.getItem('token');
        if ( token ) {
            config.headers["Authorization"] = `Bearer ${ token }`;
        }
        return config;
    }
)


export default tesloApi;