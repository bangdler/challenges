import Star from "./star.js";

const DESCRIPTIONS = [
  "We're sorry to hear that you had a bad experience. We would like to learn more about what happened and how we can make things right.",
  "We apologize for the inconvenience you experienced. We appreciate your feedback and would like to work with you to address any issues.",
  "Thank you for your feedback. We're sorry to hear that your experience wasn't perfect. We would love to hear more about your concerns to see how we can improve.",
  "Thank you for your positive feedback! We're glad to know that you had a great experience and we appreciate your support.",
  "We're thrilled to hear you had such a positive experience. Thank you for choosing our product/service.",
  "Perfect!",
];

function App($target) {
  this.$layout = document.createElement("div");
  this.$question = document.createElement("p");
  this.$starBox = document.createElement("div");
  this.$rate = document.createElement("p");
  this.$description = document.createElement("p");

  this.state = {
    rate: 0,
    edit: true,
  };

  this.setState = (newState) => {
    this.state = newState;
    this.update();
  };

  this.update = () => {
    const $newStarBox = document.createElement("div");
    $newStarBox.className = "starBox";
    for (let i = 0; i < 5; i++) {
      new Star($newStarBox, this.state, this.setState, i, i + 1);
    }
    this.$starBox.remove();
    this.$rate.insertAdjacentElement("beforebegin", $newStarBox);
    this.$starBox = $newStarBox;
    this.$rate.innerText = this.state.rate.toFixed(1);

    if (!this.state.edit) {
      const descriptionIdx = Math.floor(this.state.rate);
      this.$description.innerText = DESCRIPTIONS[descriptionIdx];
    }
  };

  this.render = () => {
    this.$layout.className = "layout";
    this.$starBox.className = "starBox";
    this.$layout.appendChild(this.$question);
    this.$layout.appendChild(this.$starBox);
    this.$layout.appendChild(this.$rate);
    this.$layout.appendChild(this.$description);
    this.$question.innerText =
      "How many stars would you give to our Online Code Editor?";

    for (let i = 0; i < 5; i++) {
      new Star(this.$starBox, this.state, this.setState, i, i + 1);
    }

    this.$rate.innerText = this.state.rate.toFixed(1);

    const descriptionIdx = Math.floor(this.state.rate);
    this.$description.innerText = DESCRIPTIONS[descriptionIdx];

    $target.appendChild(this.$layout);
  };

  this.handleClick = () => {
    const newState = {
      ...this.state,
      edit: !this.state.edit,
    };
    this.setState(newState);
  };

  this.setEvent = () => {
    $target.addEventListener("click", this.handleClick);
  };

  this.render();
  this.setEvent();
}

export default App;
