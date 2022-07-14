import React from "react";
import { AutoCompleteProps } from "../types";

export const AutoComplete = ({
  handleChange,
  searchTerm,
}: AutoCompleteProps) => {
  return (
    <div>
      <form action="">
        <div className="input-wrapper">
          <label htmlFor="character">Starwars Character</label>
          <input
            type="search"
            name="character"
            id="character"
            value={searchTerm}
            onChange={handleChange}
            className="search-input"
            placeholder="Enter character name"
          />
        </div>
      </form>
    </div>
  );
};
