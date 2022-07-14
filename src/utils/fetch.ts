import { Character } from "../types"

export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  let timeout: ReturnType<typeof setTimeout>

  return (...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise(resolve => {
      if (timeout) {
        clearTimeout(timeout)
      }
      timeout = setTimeout(() => resolve(func(...args)), waitFor)
    })
}


export async function searchCharacters(name: string) {
  if (!name || name === "") {
    return [];
  }
  try {
    const response = await fetch(
      `https://swapi.dev/api/people/?search=${name}`,
      { method: "GET" }
    );
    const responseToJson = await response.json();
    return responseToJson.results.map((result: Character) => result.name);
  } catch (error) {
    return error
  }

}

export const highlightMatchingText = (character: string, searchText: string) => {
  let matchStartIndex = character.toLowerCase().indexOf(searchText.toLowerCase());
  let matchingTextStart = character.slice(0, matchStartIndex)
  let matchingText = character.substring(
    matchStartIndex,
    matchStartIndex + searchText.length,
  )
  let matchEnd = character.substring(
    matchStartIndex + searchText.length,
  )
  return `${matchingTextStart}<span class="matchingText">${matchingText}</span>${matchEnd}`
}




