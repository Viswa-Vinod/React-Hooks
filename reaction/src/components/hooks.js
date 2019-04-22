import { useContext } from 'react';
import Context from '../context';

const useAppContext = () => {
    return useContext( Context );
}

export default useAppContext;