import React, { useEffect, useRef, useState } from "react";
import { AutoComplete } from "../components/AutoComplete";
import { Suggestions } from "../components/Suggestions";
import { debounce, searchCharacters } from "../utils/fetch";

export const Home = () => {
  const [characters, setCharacters] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [display, setDisplay] = useState(false);
  const autoCompleteRef = useRef<HTMLDivElement>(null);

  const debounceCall = debounce(async (name: string) => {
    setCharacters(await searchCharacters(name));
  }, 350);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setSearchTerm(text.trim());
    debounceCall(text.trim());
    !text ? setDisplay(false) : setDisplay(true);
  };
  const handleSuggestionClick = (text: string) => {
    setSearchTerm(text);
    setCharacters([]);
    setDisplay(false);
  };

  const handleOutsideClick = (event: any) => {
    const { current: wrap } = autoCompleteRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="home">
      <div ref={autoCompleteRef} className="home-inner">
        <AutoComplete searchTerm={searchTerm} handleChange={handleChange} />
        {display ? (
          <Suggestions
            searchTerm={searchTerm}
            suggestions={characters}
            handleSuggestionClick={handleSuggestionClick}
            display={display}
          />
        ) : null}
      </div>
    </div>
  );
};
