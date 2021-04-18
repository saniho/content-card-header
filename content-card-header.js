const LitElement = Object.getPrototypeOf(
  customElements.get("ha-panel-lovelace")
);
const html = LitElement.prototype.html;
const css = LitElement.prototype.css;

function hasConfigOrEntityChanged(element, changedProps) {
  if (changedProps.has("config")) {
    return true;
  }

  const oldHass = changedProps.get("hass");
  if (oldHass) {
    return (
      oldHass.states[element.config.entity] !==
        element.hass.states[element.config.entity]
    );
  }

  return true;
}

class ContentCardHeader extends LitElement {
  static get properties() {
    return {
      config: {},
      hass: {}
    };
  }

  render() {
    if (!this.config || !this.hass) {
      return html``;
    }
    if (stateObj) {
        return html`
            <ha-card id="card">
              ${this.renderTitle(this.config)}
            </ha-card>`
        }
    }
  }
  renderTitle(config) {
    if (this.config.showTitle === true) {
      return html
        `
          <div class="card">
          <div class="main-title">
          <span>${this.config.titleName}</span>
          </div>
          </div>` 
       }
  }
  setConfig(config) {
    const defaultConfig = {
      titleName: "",
    }

    this.config = {
      ...defaultConfig,
      ...config
    };
  }

  // @TODO: This requires more intelligent logic
  getCardSize() {
    return 3;
  }

  static get styles() {
    return css`
      .card {
        margin: auto;
        padding: 1.5em 1em 1em 1em;
        position: relative;
        cursor: pointer;
      }

      .main-title {
        margin: auto;
        text-align: center;
        font-weight: 200;
        font-size: 2em;
        justify-content: space-between;
      }
      `;
  }
}

customElements.define('content-card-header', ContentCardHeader);
