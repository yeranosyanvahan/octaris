import { useState } from 'react';

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

class State {
  n: number;
  ncolors: number;
  limit: number;
  highlighted_count: number;
  cells: number[];
  clicks: number[];
  score: number;
  mode: string;
  highlightedColor: number;
  latestPass: { cells: number[]; clicks: number[]; score: number };

  constructor(n: number = 15, ncolors: number = 5, limit: number = 3) {
    this.n = n;
    this.ncolors = ncolors;
    this.limit = limit;
    this.highlighted_count = Math.ceil(n / 2);
    this.cells = [];
    this.clicks = [];
    this.score = 0;
    this.mode = 'edit';
    this.highlightedColor = 0;
    this.latestPass = { cells: [], clicks: [], score: 0 };
    this.reset(true);
  }

  reset(starting: boolean = false) {
    const available_colors = Math.min(this.limit * 2 - 3, this.ncolors);
    if (starting) {
      this.cells = Array(this.highlighted_count).fill(this.highlightedColor).concat(
        Array(this.n - this.highlighted_count).fill(this.ncolors - 1 - this.highlightedColor)
      );
    } else {
      this.cells = Array(this.highlighted_count).fill(this.highlightedColor).concat(
        Array(this.n - this.highlighted_count).fill(0).map(() => {
          let color;
          do {
            color = Math.floor(Math.random() * available_colors);
          } while (color === this.highlightedColor);
          return color;
        })
      );
      this.cells = shuffleArray(this.cells);
    }
    this.clicks = Array(this.n).fill(0);
    this.score = 0;
    this.mode = 'pass';
    this._pass_();
  }

  is_game_over() {
    return this.clicks.some(click => click >= this.limit);
  }

  get_game_state() {
    return { cells: [...this.cells], clicks: [...this.clicks], score: this.score };
  }

  set_game_state(state: { cells: number[]; clicks: number[]; score: number }) {
    this.cells = [...state.cells];
    this.clicks = [...state.clicks];
    this.score = state.score;
  }

  sort() {
    const index_lists = Array.from({ length: this.ncolors }, () => []);
    this.cells.forEach((color_code, index) => index_lists[color_code].push(index));

    const indices = index_lists.flat();
    const index_sort = (array: number[]) => indices.map(i => array[i]);

    this.cells = index_sort(this.cells);
    this.clicks = index_sort(this.clicks);
    const { cells, clicks, score } = this.latestPass;
    this.latestPass = { cells: index_sort(cells), clicks: index_sort(clicks), score };
  }

  get_palette_color_count() {
    const counts = Array(this.ncolors).fill(0);
    this.cells.forEach(color_code => counts[color_code]++);
    return counts;
  }

  get_mode() {
    if (this.cells.includes(this.highlightedColor)) return 'edit';
    return Math.max(...this.get_palette_color_count()) === this.highlighted_count ? 'pass' : 'fail';
  }

  _pass_() {
    if (this.clicks.every(click => click >= 1)) {
      this.clicks = this.clicks.map(click => click - 1);
      this.score++;
    }
    const color_counts = this.get_palette_color_count();
    this.highlightedColor = color_counts.indexOf(this.highlighted_count);
    this.latestPass = this.get_game_state();
  }

  _fail_() {
    this.set_game_state(this.latestPass);
  }

  click(index: number, color_code: number) {
    if (color_code === this.highlightedColor) return;
    if (this.is_game_over()) return;
    if (index >= this.n || color_code >= this.ncolors) return;
    if (this.cells[index] !== this.highlightedColor) return;
    this.cells[index] = color_code;
    this.clicks[index]++;
    this.mode = this.get_mode();
    if (this.mode === 'pass') this._pass_();
    if (this.mode === 'fail') this._fail_();
  }
}

export default State;
