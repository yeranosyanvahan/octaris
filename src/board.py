import pygame

class Board:
    def __init__(self, window_height, window_width, header_height=50, palette_height=50, reset_button_height=30, difficulty_button_height=30):
        self.header_height = header_height
        self.palette_height = palette_height
        self.reset_button_height = reset_button_height
        self.difficulty_button_height = difficulty_button_height
        self.board_height = window_height - palette_height - header_height
        self.width = window_width
        self.colors = [(255, 0, 0), (0, 255, 0), (0, 0, 255), (255, 255, 0), (255, 165, 0), (128, 0, 128)]  # Red, Green, Blue, Yellow, Orange, Purple
        self.text_colors = [(0, 0, 0), (255, 255, 255), (255, 255, 255), (0, 0, 0), (0, 0, 0), (255, 255, 255)]  # Contrasting text colors
        self.reset_button_width = 80
        self.difficulty_button_width = 150
        self.sort_button_width = 80
        pygame.display.set_caption('Color Change Game with Palette')
        self.font = pygame.font.SysFont(None, 24)  # Reduced font size
        self.screen = pygame.display.set_mode((self.width, window_height))

    def draw_board(self, state):
        cell_width = self.width // int(state.n**0.5)
        cell_height = self.board_height // int(state.n**0.5)
        for index in range(len(state.cells)):
            y, x = divmod(index, int(state.n**0.5))
            if state.cells[index] != -1:  # Only draw cells with valid colors
                color = (255, 255, 255) if state.cells[index] == state.highlighted_color else self.colors[state.cells[index]]
                text_color = (0, 0, 0) if color == (255, 255, 255) else self.text_colors[state.cells[index]]
                pygame.draw.rect(self.screen, color,
                                 (x * cell_width, y * cell_height + self.header_height, cell_width, cell_height))
                text = self.font.render(str(state.clicks[index]), True, text_color)
                text_rect = text.get_rect(center=(x * cell_width + cell_width // 2,
                                                  y * cell_height + self.header_height + cell_height // 2))
                self.screen.blit(text, text_rect)

    def draw_score(self, message):
        score_text = self.font.render(message, True, (255, 255, 255))
        score_rect = score_text.get_rect(center=(self.width // 2, self.header_height // 2))
        self.screen.blit(score_text, score_rect)

    def draw_palette(self, state, selected_color=None):
        palette_y = self.board_height + self.header_height  # Position the palette below the board
        color_counts = state.get_palette_color_count()
        for i in range(state.ncolors):
            color = (255, 255, 255) if i == state.highlighted_color else self.colors[i]
            pygame.draw.rect(self.screen, color,
                             (i * (self.width // state.ncolors), palette_y, self.width // state.ncolors, self.palette_height))
            if i == selected_color:
                pygame.draw.rect(self.screen, (0, 0, 0),
                                 (i * (self.width // state.ncolors), palette_y, self.width // state.ncolors, self.palette_height), 3)
            count_text = self.font.render(str(color_counts[i]), True, (0, 0, 0))
            count_rect = count_text.get_rect(center=(i * (self.width // state.ncolors) + (self.width // state.ncolors) // 2, palette_y + self.palette_height // 2))
            self.screen.blit(count_text, count_rect)

    def draw_reset_button(self):
        reset_button_x = self.width - self.reset_button_width - 10
        reset_button_y = 10
        pygame.draw.rect(self.screen, (200, 200, 200),
                         (reset_button_x, reset_button_y, self.reset_button_width, self.reset_button_height))
        reset_text = self.font.render('Reset', True, (0, 0, 0))
        reset_rect = reset_text.get_rect(center=(reset_button_x + self.reset_button_width // 2,
                                                 reset_button_y + self.reset_button_height // 2))
        self.screen.blit(reset_text, reset_rect)

    def draw_difficulty_button(self, current_difficulty):
        difficulty_button_x = 10
        difficulty_button_y = 10
        pygame.draw.rect(self.screen, (200, 200, 200),
                         (difficulty_button_x, difficulty_button_y, self.difficulty_button_width, self.difficulty_button_height))
        difficulty_text = self.font.render(f'Difficulty: {current_difficulty}', True, (0, 0, 0))
        difficulty_rect = difficulty_text.get_rect(center=(difficulty_button_x + self.difficulty_button_width // 2,
                                                           difficulty_button_y + self.difficulty_button_height // 2))
        self.screen.blit(difficulty_text, difficulty_rect)

    def draw_sort_button(self):
        sort_button_x = 10 + self.difficulty_button_width + 10
        sort_button_y = 10
        pygame.draw.rect(self.screen, (200, 200, 200),
                         (sort_button_x, sort_button_y, self.sort_button_width, self.reset_button_height))
        sort_text = self.font.render('Sort', True, (0, 0, 0))
        sort_rect = sort_text.get_rect(center=(sort_button_x + self.sort_button_width // 2,
                                               sort_button_y + self.reset_button_height // 2))
        self.screen.blit(sort_text, sort_rect)

    def draw_highest_score(self, highest_score):
        highest_score_x = self.width - self.reset_button_width - self.sort_button_width - 30
        highest_score_y = 10
        highest_score_text = self.font.render(f'High Score: {highest_score}', True, (255, 255, 255))
        highest_score_rect = highest_score_text.get_rect(center=(highest_score_x + self.sort_button_width // 2,
                                                                 highest_score_y + self.reset_button_height // 2))
        self.screen.blit(highest_score_text, highest_score_rect)

    def draw_all(self, state, message, selected_color, current_difficulty, highest_score):
        self.screen.fill((0, 0, 0))
        self.draw_board(state)
        self.draw_score(message)
        self.draw_palette(state, selected_color)
        self.draw_reset_button()
        self.draw_difficulty_button(current_difficulty)
        self.draw_sort_button()
        self.draw_highest_score(highest_score)
        pygame.display.flip()

    def get_clicked_cell(self, pos, size):
        cell_width = self.width // size
        cell_height = self.board_height // size
        x = pos[0] // cell_width
        y = (pos[1] - self.header_height) // cell_height
        return y * size + x  # Convert 2D position to 1D index

    def is_click_on_palette(self, pos):
        palette_y = self.board_height + self.header_height
        return palette_y <= pos[1] <= palette_y + self.palette_height

    def is_click_on_board(self, pos):
        return self.header_height <= pos[1] < self.board_height + self.header_height

    def get_palette_color(self, pos, ncolors):
        return pos[0] // (self.width // ncolors)

    def is_click_on_reset_button(self, pos):
        reset_button_x = self.width - self.reset_button_width - 10
        reset_button_y = 10
        return reset_button_x <= pos[0] <= reset_button_x + self.reset_button_width and \
               reset_button_y <= pos[1] <= reset_button_y + self.reset_button_height

    def is_click_on_difficulty_button(self, pos):
        difficulty_button_x = 10
        difficulty_button_y = 10
        return difficulty_button_x <= pos[0] <= difficulty_button_x + self.difficulty_button_width and \
               difficulty_button_y <= pos[1] <= difficulty_button_y + self.difficulty_button_height

    def is_click_on_sort_button(self, pos):
        sort_button_x = 10 + self.difficulty_button_width + 10
        sort_button_y = 10
        return sort_button_x <= pos[0] <= sort_button_x + self.sort_button_width and \
               sort_button_y <= pos[1] <= sort_button_y + self.reset_button_height
