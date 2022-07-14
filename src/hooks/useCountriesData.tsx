
import { useState, useEffect } from "react";
import { countries } from "../data/countries";

interface Count {
	name: string
	code: string
}
const useCountry = () => {
	const [data, setData] = useState<Count[]>([]);
	const [loading, setLoading] = useState(true);
  
	useEffect(() => {
	  const timer = setTimeout(() => {
		setData(countries);
		setLoading(false);
	  }, 1000);
  
	  return () => clearTimeout(timer);
	}, [data]);
  
	return { data, loading };
  };
  
  export default useCountry;