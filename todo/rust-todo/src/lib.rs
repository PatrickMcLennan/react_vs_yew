#![recursion_limit = "512"]

use wasm_bindgen::prelude::*;
use yew::prelude::*;
use yew::InputData;

struct Model {
    link: ComponentLink<Self>,
    state: State,
}

struct State {
    input: String,
    tasks: Vec<String>,
    error: bool,
}

enum Msg {
    AddTask,
    RemoveTask(usize),
    RemoveAllTasks,
    UpdateInput(String),
}

impl Model {
    fn view_task(&self, index: usize, task: &String) -> Html {
        html! {
            <li class="li">
                {task}
                <button class="button" onclick={self.link.callback(|_| Msg::RemoveTask(index))}> {"Delete"} </button>
            </li>
        }
    }
}

impl Component for Model {
    type Properties = ();
    type Message = Msg;

    fn create(_: Self::Properties, link: ComponentLink<Self>) -> Self {
        let state = State {
            input: String::new(),
            tasks: Vec::new(),
            error: false,
        };

        Model { link, state }
    }

    fn update(&mut self, msg: Self::Message) -> ShouldRender {
        match msg {
            Msg::AddTask => {
                if self.state.input.len() == 0 {
                    self.state.error = true
                } else {
                    let new_task: &String = &self.state.input;
                    self.state.error = false;
                    self.state.tasks.push(new_task.to_string());
                    self.state.input = String::new();
                }
            }
            Msg::RemoveTask(index) => {
                self.state.tasks.remove(index);
            }
            Msg::RemoveAllTasks => {
                self.state.tasks = Vec::new();
            }
            Msg::UpdateInput(new_input) => {
                self.state.input = new_input;
            }
        }
        true
    }

    fn change(&mut self, _props: Self::Properties) -> ShouldRender {
        false
    }

    fn view(&self) -> Html {
        html! {
          <div class="background">
            <form class="form" onsubmit={self.link.callback(|e| {e.prevent_default(); Msg::AddTask})}>
              <label class={if self.state.error { "label-error" } else { "label" }} htmlFor="task">
                <span class="span">
                  {"Enter your Task:"} <sup>{"*"}</sup>
                </span>
                <input
                  aria-label="Enter your Task"
                  class="input"
                  name="task"
                  oninput={self.link.callback(|e: InputData| Msg::UpdateInput(e.value))}
                  type="text"
                  value={&self.state.input}
                />
              </label>
              <input class="submit" type="submit" value="Save" />
            </form>
            <ul class="ul">
              {for self.state.tasks.iter().enumerate().map(|(i, task)| self.view_task(i, task))}
            </ul>
            {if self.state.tasks.len() >= 1 {
              html!{
                <button class="delete-all" onclick={self.link.callback(|_| Msg::RemoveAllTasks)}>
                  {"Delete All"}
                </button>
              }
            } else {
              html! {}
            }}
          </div>
        }
    }
}

#[wasm_bindgen(start)]
pub fn run_app() {
    App::<Model>::new().mount_to_body();
    // mount_to_body_with_props allows you to mount the component with dynamic props, cool
}
