/*
Create an autosuggestion box in vanilla js.
Show suggestions area below the input field.
The suggestion area should be visible only when input box is focused.
Fetch the suggestions based on the input, and populate the suggestion menu with the suggestions.
On click of suggestion populate the input box with the suggestion value and focus the back the input box
*/
(function () {
  const input = document.getElementById("suggestion-input");
  const suggestionContainer = document.getElementById("suggestion-menu");
  /*
    Toggle the visibility of menu
    */
  input.addEventListener("focus", () => {
    suggestionContainer.classList.add("open");
  });
  input.addEventListener("focusout", () => {
    suggestionContainer.classList.remove("open");
  });

  /*
Fetch and process search 
*/
  const handleInputChange = debounce(fetchProcessSuggestions, 500);

  input.addEventListener("input", async (e) => {
    const value = e.target.value;
    handleInputChange(value);
  });

  /*
Onclick on an item populate the input and refocus the input field
*/
  suggestionContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "LI") {
      input.value = e.target.textContent;
      input.focus();
    }
  });

  async function fetchProcessSuggestions(value) {
    if (value) {
      const products = await fetchSuggestions(value);
      const items = [];
      // This will only run when there is an item
      products.forEach((p) => {
        const item = document.createElement("li");
        item.className = "suggestion-menu__item";
        item.textContent = p.name;
        items.push(item);
      });
      // Clear the previous results before inserting new results for the new query
      suggestionContainer.innerHTML = "";
      suggestionContainer.append(...items);
    } else {
      suggestionContainer.innerHTML = "";
    }
  }

  async function fetchSuggestions(search) {
    try {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${search}`,
      );
      const products = await res.json();
      return products.products.map((p) => ({
        name: p.title,
      }));
    } catch (error) {
      return [];
    }
  }

  function debounce(fn, delay) {
    let timerId = null;
    return (...args) => {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    };
  }
})();
