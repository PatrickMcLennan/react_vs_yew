use rand::seq::SliceRandom;
use rand::thread_rng;
use yew::prelude::*;

const ERROR: String = String::from("error");
const WORDS: [String; 5] = [
    String::from("rust"),
    String::from("react"),
    String::from("hangman"),
    String::from("javascript"),
    String::from("typescript"),
];

struct Model {
    link: ComponentLink<Self>,
    state: State,
}

struct State {
    error: bool,
    guess: String,
    guesses: Vec<char>,
    remaining_guesses: u8,
    word: Option<&String>,
    message: String,
    game_lost: bool,
    game_won: bool,
}

impl State {
    fn new() -> Self {
        let mut new_word: &String = WORDS.choose(&mut thread_rng()).unwrap();
        if !WORDS.includes(&new_word) { new_word = &ERROR; }

        Self {
            error: false,
            guess: String::new(),
            guesses: Vec::new(),
            remaining_guesses: 5,
            word: new_word,
            message: String::new(),
            game_lost: false,
            game_won: false,
        }
    }
}

enum Msg {
    Reset,
}

impl Component for Model {
    type Properties = ();
    type Message = Msg;

    fn create(_: Self::Properties, link: ComponentLink<Self>) -> Self {
        let state: State = State::new();

        Model { link, state }
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg {
            Msg::Reset => {
                self.state = State::new()
            }
        }
        true
    }

    fn change(&mut self, _props: Self::Properties) -> ShouldRender {
        false
    }

    fn view(&self) -> Html {
        html! {
            <div class="container align-middle background text-center">
                <div class="word-display mx-auto mt-5 mb-2 w-50 text-center">

                </div>
            </div>
        }
    }
}
