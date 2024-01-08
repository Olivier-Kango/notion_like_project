/* eslint no-param-reassign: "error" */
import React from 'react';
import '../styling/App.scss';
import Input from './Input';
import random from './function/random';
import { setCaretToEnd } from './function/caretHelpers';

const initialInput = {
  id: random(),
  html: '',
  tag: 'p',
  placeholder: 'Type / for blocks, @ to link docs or people',
};

class EditablePage extends React.Component {
  constructor(props) {
    super(props);
    this.updatePageHandler = this.updatePageHandler.bind(this);
    this.addInputHandler = this.addInputHandler.bind(this);
    this.deleteInputHandler = this.deleteInputHandler.bind(this);
    this.state = { inputs: [initialInput] };
  }

  updatePageHandler(updatedInput) {
    const { inputs } = this.state;
    const index = inputs.map((b) => b.id).indexOf(updatedInput.id);
    switch (updatedInput.tag) {
      case 'h1':
        updatedInput.placeholder = 'Heading 1';
        break;
      case 'p':
        updatedInput.placeholder = 'Type / for blocks, @ to link docs or people';
        break;
      default:
        updatedInput.placeholder = '';
    }

    const updatedInputs = [...inputs];

    updatedInputs[index] = {
      ...updatedInputs[index],
      tag: updatedInput.tag,
      html: updatedInput.html,
      placeholder: updatedInput.placeholder,
    };
    this.setState({ inputs: updatedInputs });
  }

  addInputHandler(currentInput) {
    const newInput = {
      id: random(),
      html: '',
      tag: 'p',
      placeholder: 'Type / for blocks, @ to link docs or people',
    };
    const { inputs } = this.state;
    const index = inputs.map((b) => b.id).indexOf(currentInput.id);
    const updatedInputs = [...inputs];

    updatedInputs.splice(index + 1, 0, newInput);

    updatedInputs.forEach((input, i) => {
      if (i !== index + 1) {
        input.placeholder = '';
      }
    });

    this.setState({ inputs: updatedInputs }, () => {
      currentInput.ref.nextElementSibling.focus();
    });
  }

  deleteInputHandler(currentInput) {
    // Only delete the Input, if there is a preceding one
    const previousInput = currentInput.ref.previousElementSibling;
    if (previousInput) {
      const { inputs } = this.state;
      const index = inputs.map((b) => b.id).indexOf(currentInput.id);
      const updatedInputs = [...inputs];
      updatedInputs.splice(index, 1);
      this.setState({ inputs: updatedInputs }, () => {
        setCaretToEnd(previousInput);
        previousInput.focus();
      });
    }
  }

  render() {
    const { inputs } = this.state;
    return (
      <div className="Page">
        {inputs.map((input) => (
          <Input
            key={input.id}
            id={input.id}
            tag={input.tag}
            html={input.html}
            placeholder={input.placeholder}
            updatePage={this.updatePageHandler}
            addInput={this.addInputHandler}
            deleteInput={this.deleteInputHandler}
          />
        ))}
      </div>
    );
  }
}

export default EditablePage;
