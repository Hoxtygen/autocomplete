import React from "react";
import { SuggestionProps } from "../types";
import { highlightMatchingText } from "../utils/helpers";

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
          {suggestions.map((suggest) => (
            <li
              className="suggestions-item"
              key={suggest}
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
