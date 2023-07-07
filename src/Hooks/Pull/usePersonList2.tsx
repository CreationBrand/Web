import { useState } from "react";






const usePersonList2 = (person_id: string, filter: string) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [cursor, setCursor] = useState(false);
    const [components, setComponents] = useState([]);



    return [isLoading, isError, components]
}



export default usePersonList2;