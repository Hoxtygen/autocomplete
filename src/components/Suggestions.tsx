import React from "react";
import { SuggestionProps } from "../types";
import { highlightMatchingText } from "../utils/fetch";

export const Suggestions = ({
  suggestions,
  searchTerm,
  handleSuggestionClick,
}: SuggestionProps) => {
	 
  return (
    <div className="suggestions-container">
      {suggestions.length === 0 && searchTerm !== "" ? (
        <p>No result match your query</p>
      ) : (
        <ul className="suggestions-options">
          {suggestions.map((suggest, index) => (
            <li
			className="suggestions-item"
              key={index}
              onClick={() => handleSuggestionClick(suggest)}
              dangerouslySetInnerHTML={{
                __html: highlightMatchingText(suggest, searchTerm),
              }}
            ></li>
          ))}
        </ul>
      )}
    </div>
  );
};
