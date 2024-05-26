import random
import math

class State:
    def __init__(self, n=15, ncolors=5, limit=3):
        self.n = n
        self.ncolors = ncolors
        self.limit = limit
        self.highlighted_count = math.ceil(self.n / 2)
        self.reset(starting=True)

    def reset(self, starting = False):
        self.clicks = [0] * self.n
        self.score = 0
        self.mode = "pass"
        self.highlighted_color = 0  # Hard-coded highlighted color
        self.clicks = [0] * self.n
        available_colors = min(self.limit*2-3, self.ncolors) # get how many colors to generate
        if starting:
            self.cells = [self.highlighted_color] * self.highlighted_count + [self.ncolors - 1 - self.highlighted_color] * (self.n - self.highlighted_count)
        else:
            self.cells = [self.highlighted_color] * self.highlighted_count + \
                        [random.choice([i for i in range(available_colors) if i != self.highlighted_color]) for _ in range(self.n - self.highlighted_count)]
            random.shuffle(self.cells)
        self._pass_()

    def is_game_over(self):
        return any(click >= self.limit for click in self.clicks)

    def get_game_state(self):
        return list(self.cells), list(self.clicks), self.score

    def set_game_state(self, state):
        cells, clicks, score = state
        self.cells, self.clicks, self.score = list(cells), list(clicks), score

    def sort(self):
        index_lists = [[] for _ in range(self.ncolors)]
        for index, color_code in enumerate(self.cells):
            index_lists[color_code].append(index)
        indicies = [flattened for index_list in index_lists for flattened in index_list]
        def index_sort(array):
            return [array[i] for i in indicies]
        
        self.cells = index_sort(self.cells)
        self.clicks = index_sort(self.clicks)
        cells, clicks, score = self.latest_pass
        self.latest_pass = index_sort(cells), index_sort(clicks), score

    def get_palette_color_count(self):
        counts = [0] * self.ncolors
        for color_code in self.cells:
            counts[color_code] += 1
        return counts

    def get_mode(self):
        if self.cells.count(self.highlighted_color) != 0: return "edit"

        if max(self.get_palette_color_count()) == self.highlighted_count:
            return "pass"
        else:
            return "fail"

    def _pass_(self):
        if all(click >= 1 for click in self.clicks):
            self.clicks = [click - 1 for click in self.clicks]
            self.score = self.score + 1
        color_counts = self.get_palette_color_count()
        self.highlighted_color = color_counts.index(self.highlighted_count)
        self.latest_pass = self.get_game_state()

    def _fail_(self):
        self.set_game_state(self.latest_pass)

    def click(self, index, color_code):
        if color_code == self.highlighted_color: return
        if self.is_game_over(): return
        if index >= self.n or color_code >= self.ncolors: return
        if self.cells[index] != self.highlighted_color: return
        self.cells[index] = color_code
        self.clicks[index] += 1
        mode = self.get_mode()
        if mode == "pass":
            self._pass_()
        if mode == "fail":
            self._fail_()
        self.mode = mode
