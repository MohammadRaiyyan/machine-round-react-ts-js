import { fetchSuggestions } from "../services/getSuggestionAPI.js";
import { getState, setState, subscribe } from "../store/index.js";
import { debounce } from "../utils/debounce.js";

export class AutoSuggestion extends HTMLElement {
  #abort;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = new URL("../styles.css", import.meta.url);

    this.shadowRoot.appendChild(link);
  }
  connectedCallback() {
    this.shadowRoot.innerHTML += `
        <div class="wrapper">
            <input type="text" placeholder="Search..."/>
            <div class="list" hidden></div>
        </div>
    `;

    this.$input = this.shadowRoot.querySelector("input");
    this.$list = this.shadowRoot.querySelector(".list");

    this.onInputDebounced = debounce(this.onInput.bind(this));
    this.$input.addEventListener("input", (e) =>
      this.onInputDebounced(e.target.value),
    );
    this.$input.addEventListener("keydown", this.onKeyDown.bind(this));
    this.$input.addEventListener("focus", this.onInputFocus.bind(this));
    this.$input.addEventListener("blur", this.onInputBlur.bind(this));
    this.$list.addEventListener("click", this.onClick.bind(this));
    this.unsubscribe = subscribe(this.render.bind(this));
  }
  disconnectedCallback() {
    this.unsubscribe?.();
  }
  onInput(query) {
    setState({
      loading: true,
      error: null,
      activeIndex: -1,
      query,
    });

    if (this.#abort) this.#abort.abort();
    this.#abort = new AbortController();
    fetchSuggestions(query, this.#abort.signal)
      .then((data) => setState({ suggestions: data, loading: false }))
      .catch((e) => {
        if (e.name === "AbortError") return;
        setState({ loading: false, error: "Failed to load" });
      });
  }
  onInputFocus() {
    this.$list.hidden = false;
  }
  onInputBlur() {
    setTimeout(() => {
      this.$list.hidden = true;
    }, 100);
  }
  onClick(e) {
    const item = e.target.closest(".item");
    if (!item) {
      return;
    }
    this.select(item.textContent.trim());
  }
  select(value) {
    this.$input.value = value;
    this.$input.focus();
    setState({ suggestions: [] });
  }

  onKeyDown(e) {
    const { activeIndex, suggestions } = getState();
    if (e.key == "ArrowDown") {
      e.preventDefault();
      setState({
        activeIndex: Math.min(activeIndex + 1, suggestions.length - 1),
      });
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setState({
        activeIndex: Math.max(activeIndex - 1, 0),
      });
    }
    if (e.key === "Enter") {
      this.select(suggestions[activeIndex]);
    }
  }

  render(state) {
    const { suggestions, loading, error, activeIndex } = state;
    if (loading) {
      this.$list.innerHTML = `<div class="loading">Loading...</div>`;
      return;
    }
    if (error) {
      this.$list.innerHTML = `<div class="error">${error}</div>`;
      return;
    }

    this.$list.innerHTML = suggestions
      .map((s, i) => {
        return `
        <div class="item ${i === activeIndex ? "active" : ""}">
            ${s}
        </div>
        `;
      })
      .join("");
  }
}

customElements.define("auto-suggest", AutoSuggestion);
