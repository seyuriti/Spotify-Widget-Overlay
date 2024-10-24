const DEFAULT_SETTINGS = {
  theme: 'light',
  navbar_position: 'left',
  widget_template: 1,
};

class Config {
  constructor() {
    const savedSettings = JSON.parse(localStorage.getItem('userSettings'));
    this.settings = { ...DEFAULT_SETTINGS, ...savedSettings };
  }

  get(key) {
    return this.settings[key];
  }

  set(key, value) {
    this.settings[key] = value;
    this.save();
  }

  save() {
    localStorage.setItem('userSettings', JSON.stringify(this.settings));
  }
}

const config = new Config();
export default config;