import pygame
from state import State
from board import Board

class Game:
    def __init__(self):
        pygame.init()
        self.window_height = 800  # Increased window height to accommodate the palette
        self.window_width = 800
        self.board = Board(self.window_height, self.window_width)
        self.current_difficulty = 'easy'
        self.state_levels = {
            'easy': State(n=3 * 3, ncolors=4, limit=3),
            'medium': State(n=5 * 5, ncolors=5, limit=4),
            'hard': State(n=7 * 7, ncolors=6, limit=4)
        }
        self.state_levels['medium'].reset()
        self.state_levels['hard'].reset()
        self.state = self.state_levels[self.current_difficulty]
        self.initial_messages = [
            'Please select yellow from the palette.',  # force user to click on yellow
            'Paint the top left cell yellow.',  # force user to click on top left pixel
            'Paint the rest green. (Select the green).',  # force user to click on green
            'Your goal is to repaint all the white',  # continue game as normal
            'Repaint in a specific way to move forward.',  # continue game as normal
            'If you have exactly 5 of a same color (except white), you move forward.',  # continue game as normal
            'Then this color becomes the new white color.',  # continue game as normal
            'On the palette, you see numbers that show how many of each color are on the screen.',  # continue game as normal
            'If any cell goes above 3, you lose.',  # continue game as normal
            'Good luck, have fun!'  # show all buttons
        ]
        self.initial_message_index = 0
        self.show_initial_message = True
        self.selected_color = 0  # Default selected color
        self.highest_scores = {'easy': 0, 'medium': 0, 'hard': 0}
        self.show_buttons = False

    def set_difficulty(self, difficulty):
        self.current_difficulty = difficulty
        self.state = self.state_levels[self.current_difficulty]
        self.paint()

    def cycle_difficulty(self):
        if self.current_difficulty == 'easy':
            self.set_difficulty('medium')
        elif self.current_difficulty == 'medium':
            self.set_difficulty('hard')
        else:
            self.set_difficulty('easy')

    def sort_colors(self):
        self.state.sort()
        self.paint()

    def handle_game_click(self, pos):
        if self.board.is_click_on_reset_button(pos):
            self.state.reset()
        elif self.board.is_click_on_difficulty_button(pos):
            self.cycle_difficulty()
        elif self.board.is_click_on_sort_button(pos):
            self.sort_colors()
        elif self.board.is_click_on_palette(pos):
            self.selected_color = self.board.get_palette_color(pos, self.state.ncolors)
        elif self.state.is_game_over() == False and self.board.is_click_on_board(pos):
            index = self.board.get_clicked_cell(pos, int(self.state.n**0.5))
            self.state.click(index, self.selected_color)
            if self.state.score > self.highest_scores[self.current_difficulty]:
                self.highest_scores[self.current_difficulty] = self.state.score
            
        self.paint()

    def on_click(self, pos):
        if self.show_initial_message:
            self.advance_tutorial(pos)
        else:
            self.handle_game_click(pos)

    def advance_tutorial(self, pos):
        if self.initial_message_index == 0:
            if self.board.is_click_on_palette(pos):
                self.selected_color = self.board.get_palette_color(pos, self.state.ncolors)
                if self.selected_color == 3:  # Ensure yellow is selected
                    self.initial_message_index += 1
                    self.paint()
        elif self.initial_message_index == 1:
            index = self.board.get_clicked_cell(pos, int(self.state.n**0.5))
            if index == 0 and self.selected_color == 3:  # Ensure the top left cell is painted yellow
                self.state.click(index, self.selected_color)
                self.initial_message_index += 1
                self.paint()
        elif self.initial_message_index == 2:
            if self.board.is_click_on_palette(pos):
                self.selected_color = self.board.get_palette_color(pos, self.state.ncolors)
                if self.selected_color == 1:  # Ensure green is selected
                    self.initial_message_index += 1
                    self.paint()
        else:
            self.initial_message_index += 1
            if self.initial_message_index == len(self.initial_messages) - 1:
                self.show_buttons = True
            elif self.initial_message_index >= len(self.initial_messages):
                self.show_initial_message = False
            self.handle_game_click(pos)
            self.paint()

    def paint(self):
        if self.show_initial_message:
            message = self.initial_messages[self.initial_message_index]
            self.board.screen.fill((0, 0, 0))
            self.board.draw_score(message)
            if self.initial_message_index > 0:
                self.board.draw_board(self.state)
            self.board.draw_palette(self.state, self.selected_color)
            if self.show_buttons:
                self.board.draw_reset_button()
                self.board.draw_difficulty_button(self.current_difficulty)
                self.board.draw_sort_button()
            pygame.display.flip()
        else:
            if self.state.is_game_over():
                message = f'Game Over! Your score is: {self.state.score}'
            else:
                message = f'Score: {self.state.score}'
            self.board.draw_all(self.state, message, self.selected_color, self.current_difficulty, self.highest_scores[self.current_difficulty])
            pygame.display.flip()

    def start_tutorial(self):
        self.show_initial_message = True
        self.initial_message_index = 0
        self.paint()

    def run(self):
        self.start_tutorial()
        running = True
        while running:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False
                elif event.type == pygame.MOUSEBUTTONDOWN:
                    self.on_click(event.pos)
        pygame.quit()

if __name__ == "__main__":
    game = Game()
    game.run()
