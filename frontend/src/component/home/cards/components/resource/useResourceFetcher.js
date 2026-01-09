import { useState, useEffect, useCallback } from 'react';
import { API_LINKS, CACHE_KEY } from '../../../homeConfig';


const useResourceFetcher = () => {
    // State to hold all data, loading status, and active resource
    const [dataMap, setDataMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeResource, setActiveResource] = useState('characters');

    // Helper for basic fetch logic (Memoized)
    const useFetch = useCallback(async (endpoint) => {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }, []);

    // Function to fetch ALL pages for a single resource (Memoized)
    const fetchAllPages = useCallback(async (resourceKey) => {
        let allResults = [];
        let url = API_LINKS[resourceKey];
        
        while (url) {
            const data = await useFetch(url);
            
            // Assuming data.results is an array
            allResults = [...allResults, ...data.results];
            
            url = data.info.next_page; // Get the next URL
        }
        return allResults;
    }, [useFetch]);
    
    // Initial Load Logic (Mount)
    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);

            // 1. Check Local Storage
            const cachedData = localStorage.getItem(CACHE_KEY);
            if (cachedData) {
                const parsedData = JSON.parse(cachedData);
                setDataMap(parsedData);
                setLoading(false);
                return; 
            }
            
            // 2. Fetch from API if cache missed
            try {
                // Sequential fetch for Titans then Characters (to follow what i want only)
                const titans = await fetchAllPages('titans');
                const characters = await fetchAllPages('characters');
                const episodes = await fetchAllPages('episodes');
                
                const initialMap = { titans, characters, episodes };
                
                // 3. Save to Local Storage
                localStorage.setItem(CACHE_KEY, JSON.stringify(initialMap));

                setDataMap(initialMap);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, [fetchAllPages]); // fetchAllPages must be a dependency

    // Click Handler for Lazy Loading/Caching Logic (Memoized)
    const handleResourceClick = useCallback(async (resourceKey) => {

        setActiveResource(resourceKey);

        // Check 1: Is the data already in our cache (dataMap)?
        if (dataMap[resourceKey]) {
            return; // Use cached data
        }

        // Check 2: Data is NOT cached, initiate fetch
        setLoading(true);
        try {
            const results = await fetchAllPages(resourceKey);
            
            // Update dataMap and Local Storage
            setDataMap(prev => {
                const newMap = { ...prev, [resourceKey]: results };
                localStorage.setItem(CACHE_KEY, JSON.stringify(newMap));
                return newMap;
            });

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [dataMap, fetchAllPages]); // dataMap is a required dependency

    // Expose all necessary state and functions
    return { 
        dataMap, 
        loading, 
        error, 
        activeResource, 
        handleResourceClick,
        setActiveResource,
        API_LINKS // Expose links for rendering buttons in the component
    };
};

export default useResourceFetcher;